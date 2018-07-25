---
path: "2018-07-24-contrived-refactor"
date: "2018-07-24T14:00:00-04:00"
title: "A Contrived Refactor"
excerpt: "Here's a contrived example of refactoring some code to be more testable."
category: "tech"
tags:
   - .NET
   - C#
   - Unit Testing
   - Testing
   - Refactoring
   - Moq
   - SOLID Principle
---

Some of the most nerve-wracking places to test new features or maintenance on mostly untested systems is anywhere that the logic actually changes something on the system. Testing these places manually is tedious and difficult to isolate. So here's a contrived example of a class that does some simple logic.

## The Beginning Code

This class takes two filenames, reads all text from these files, removes comment lines,  sorts the lines, and then finally writes them out to a third file.

```csharp
using System.IO;
using System.Linq;

class CombineServiceLogic
{
    private bool IsCommentLine(string line)
    {
        return line.StartsWith("#");
    }
    public void CombineDataFiles(string inputFilename1, string inputFilename2, string outputFilename)
    {
        var file1Contents = System.IO.File.ReadAllLines(inputFilename1);
        var file2Contents = System.IO.File.ReadAllLines(inputFilename2);

        var lines = file1Contents
            .Concat(file2Contents)
            .Where(x => !IsCommentLine(x))
            .OrderBy(x => x)
            .ToArray();

        File.WriteAllLines(outputFilename, lines);
    }
}
```

<br/>

A sample of how the above class might be called is here.

```csharp
class Program
{
    static void Main(string[] args)
    {
        var logic = new CombineServiceLogic();

        logic.CombineDataFiles("file1.txt", "file2.txt", "output.txt");
    }
}
```

<br/>

Two example data files.  _file1.txt_

```
123
456
# 789
```

And  _file2.txt_

```
567
# 890
234
```

Would result in this final file _output.txt_.

```
123
234
456
567
```

## The Concerns

* I can't test the filtering/sorting logic as-is, without writing files.
* This _CombineServiceLogic_ is used in 5000 locations throughout the project and we don't have dependency injection.  No comment.
    * It's very unlikely that I can change the constructor or the method call without breaking something somewhere.  I'm not approved for breaking changes.
* I've had feature requests for adding optional parameters to this class's methods for optional functionality additions. I need to make sure the new code works without breaking the old code.

## The Refactor

Looking at my concerns, my biggest one is removing that file input/output from this class because writing any output can have some unintended side-effects from automated processes.  

Note that output could be anything like email, text messages, user notifications, often things that are completely unacceptable to do by accident.

Also, the input could have unintended side-effects.  It might not always be a file input, it could be a message queue for example.

I use two methods from the File class there, so I'm going to put that into an interface.

```csharp
interface IHaveFiles
{
    string[] ReadAllLines(string fileName);
    void WriteAllLines(string fileName, string[] lines);
}
```

I can then implement that interface. This implementation is barebones and pretty much just a pass-through.

```csharp
class HaveFiles : IHaveFiles
{
    public string[] ReadAllLines(string fileName)
    {
        return System.IO.File.ReadAllLines(fileName);
    }
    public void WriteAllLines(string fileName, string[] lines)
    {
        System.IO.File.WriteAllLines(fileName, lines);
    }
}
```

<br/>

The _CombineServiceLogic_ class now looks like this. Completely free of _System.IO_ references.

```csharp
using System.Linq;

class CombineServiceLogic
{
    private readonly IHaveFiles iHaveFiles = new HaveFiles();

    private bool IsCommentLine(string line)
    {
        return line.StartsWith("#");
    }
    public void CombineDataFiles(string inputFilename1, string inputFilename2, string outputFilename)
    {
        var file1Contents = iHaveFiles.ReadAllLines(inputFilename1);
        var file2Contents = iHaveFiles.ReadAllLines(inputFilename2);

        var lines = file1Contents
            .Concat(file2Contents)
            .Where(x => !IsCommentLine(x))
            .OrderBy(x => x)
            .ToArray();

        iHaveFiles.WriteAllLines(outputFilename, lines);
    }
}
```

<br/>

Getting _System.IO_ out of there is a good first step, but this class is still calling the _System.IO.File_ behind the scenes everytime.

Remember that I can't change how this class is called in 5000 places: with an empty default constructor. But I'd like to be able to pass in my own mocked implementation for tests.  I can add two constructors instead of just one to do this!


```csharp
using System.Linq;

class CombineServiceLogic
{
    private readonly IHaveFiles iHaveFiles;

    public CombineServiceLogic()
    {
        this.iHaveFiles = new HaveFiles();
    }
    public CombineServiceLogic(IHaveFiles iHaveFiles)
    {
        this.iHaveFiles = iHaveFiles;
    }

    private bool IsCommentLine(string line)
    {
        return line.StartsWith("#");
    }
    public void CombineDataFiles(string inputFilename1, string inputFilename2, string outputFilename)
    {
        var file1Contents = iHaveFiles.ReadAllLines(inputFilename1);
        var file2Contents = iHaveFiles.ReadAllLines(inputFilename2);

        var lines = file1Contents
            .Concat(file2Contents)
            .Where(x => !IsCommentLine(x))
            .OrderBy(x => x)
            .ToArray();

        iHaveFiles.WriteAllLines(outputFilename, lines);
    }
}
```

<br/>

Now I can start to write tests!  The 5000 mythical usages of this class should be untouched because they will continue to use the default no-parameter constructor.

## Tests

What I've used most in the past is [xUnit.net][0] and [Moq][1].  Substitute your preferred testing libraries as desired.

I've written one happy path test that tests success.

```csharp
using System;
using Xunit;
using Moq;

public class CombineServiceLogicTests
{
    [Fact]
    public void TestHappyPath()
    {
        # Mock file interface
        var fileMoq = new Mock<IHaveFiles>();

        # Define expected parameters and return values.
        fileMoq.Setup(x => x.ReadAllLines("file1.txt")).Returns(new[] { "12", "34", "# 56" });
        fileMoq.Setup(x => x.ReadAllLines("file2.txt")).Returns(new[] { "23", "45", "# 78" });
        fileMoq.Setup(x => x.WriteAllLines("file3.txt", new[] { "12", "23", "34", "45" }));

        # Pass file mock into the service logic.
        var combineServiceLogic = new CombineServiceLogic(fileMoq.Object);

        # DO THE LOGIC!!!!
        combineServiceLogic.CombineDataFiles("file1.txt", "file2.txt", "file3.txt");

        # Ask Moq to verify stuff that happened.
        fileMoq.VerifyAll();
    }
}
```

<br/>

In the real world, you should also write the negative tests and so on.  I'll leave that to you.

## Summary

The point I'm making is that my complex business logic no longer is entirely dependent upon file input/output and that I didn't change the code anywhere else but here. Go ahead and write a few more tests, and then implement new features with confidence! 

[Relevant book][2].

[0]: https://xunit.github.io/
[1]: https://github.com/Moq/moq4/wiki/Quickstart
[2]: https://www.amazon.com/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052
