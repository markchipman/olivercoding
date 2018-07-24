---
path: "2018-07-24-grafana"
date: "2018-07-24T13:00:00-04:00"
title: "Grafana + Prometheus = Awesome"
excerpt: "Grafana is an excellent way to visualize data collected by Prometheus."
category: "tech"
tags:
   - Prometheus
   - Monitoring
   - Grafana
---

The first blog post for setting up Prometheus and adding a custom client library is [here][0].

As a quick reminder, the custom metrics I have is the count of API calls by Method and Endpoint.

![Custom Metrics](20180724_custom_metrics.png)

## Grafana

Grafana is an excellent graphing data visualization platform.  Go ahead and download it from [here][1].

Start it with this command.

```powershell
.\grafana-server.exe web
```

<br/>

```powershell
PS C:\Users\Daniel\Downloads\grafana-5.2.1.windows-amd64\grafana-5.2.1\bin> .\grafana-server.exe web
...
...
...
[32mINFO[0m[07-24|19:04:18] Initializing SearchService               [32mlogger[0m=server
[32mINFO[0m[07-24|19:04:18] Initializing PluginManager               [32mlogger[0m=server
[32mINFO[0m[07-24|19:04:18] Starting plugin search                   [32mlogger[0m=plugins
[32mINFO[0m[07-24|19:04:18] Plugin dir created                       [32mlogger[0m=plugins [32mdir[0m=C:\\Users\\Daniel\\Downloads\\grafana-5.2.1.windows-amd64\\grafana-5.2.1\\data\\plugins
[32mINFO[0m[07-24|19:04:18] Initializing InternalMetricsService      [32mlogger[0m=server
[32mINFO[0m[07-24|19:04:18] Initializing AlertingService             [32mlogger[0m=server
[32mINFO[0m[07-24|19:04:18] Initializing HTTPServer                  [32mlogger[0m=server
[32mINFO[0m[07-24|19:04:18] Initializing CleanUpService              [32mlogger[0m=server
[32mINFO[0m[07-24|19:04:18] Initializing NotificationService         [32mlogger[0m=server
[32mINFO[0m[07-24|19:04:18] Initializing ProvisioningService         [32mlogger[0m=server
[32mINFO[0m[07-24|19:04:18] Initializing RenderingService            [32mlogger[0m=server
[32mINFO[0m[07-24|19:04:18] Initializing TracingService              [32mlogger[0m=server
[32mINFO[0m[07-24|19:04:18] Initializing Stream Manager
[32mINFO[0m[07-24|19:04:18] HTTP Server Listen                       [32mlogger[0m=http.server [32maddress[0m=0.0.0.0:3000 [32mprotocol[0m=http [32msubUrl[0m= [32msocket[0m=
```

The default username and password is "admin" and "admin".  The url is http://localhost:3000/login.  On first login, you might be prompted to change password.

![Grafana Login](20180724_grafana_login.png)

On first login, there won't be anything to show.

![Grafana Empty](20180724_empty_grafana.png)

Go ahead and click on that "Add data source". But make sure that Prometheus is running on the local machine.

Fill out Grafana Data source as shown below to add a localhost Prometheus, then "Save &d Test".

![Grafana Data Source](20180724_Grafana_AddDataSource.png)

Choose "New Dashboard" from the side button.

![Grafana New Dashboard](20180724_new_dashboard.png)

Let's create a new graph panel.

![Grafana New Dashboard](20180724_new_graph.png)

![Grafana Edit Dashboard](20180724_edit_graph.png)

Fill out the textboxes with below. Also, make sure to do whatever needed to generate custom metrics.

* Formula: _rate(PathCounter[5m])_
* Legend Format: _{{method}} - {{endpoint}}_

![Grafana Rate](20180724_grafana_rate.png)

On the top, there's a "Save button" icon. Click

![Save As](20180724_saveas.png)

Congratulations!  The dashboard now has a fancy graph showing data in real-time.

![Save As](20180724_dashboard.png)

## Summary

Add dashboards, add panels, add visualizations. Customize the view of data however you need to. Make the data actionable and valuable for your boss, for your team, and for you. Data visualization without meaning is just white noise.

[0]: /2018-07-22-prometheus-dotnetcore
[1]: https://grafana.com/grafana/download
