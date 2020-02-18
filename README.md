# Name

Linkviewer - Visualizing job ad links

## Description

The purpose of this repository is to provide some examples of how to
process scraped job ad data and visualizing links to ads. The program runs entirely in the browser.

## Live demo

An live demo can be found here

 [Demo site](https://blog.jobtechdev.se/linkviwer)

## Installation

For processing the data [Bash](https://www.gnu.org/software/bash),
[jq](https://stedolan.github.io/jq/) and [Curl](https://curl.haxx.se/)
installed in your environment. It probably works with some other
shells too.

## Repository structure

__docs/__
The cataloge is a github pages. The deployment process for the demo site is to build and update the files in this cataloge.

__src/__ The source code for the site.

__data/__ A prebuilt index and files with raw data file with job ads titles.

## Build
**TODO 1:** Make a build script that outputs a site.

**Info:** The source file(all_job_ads.json) with all job ad data is located in af:s S3 bucket.

Remove secret data:
```
cat all_job_ads.json | jq '[.[] | {id:.identifier,title:.title,body:.url}]' > raw_data.json
```
Prebuild index for lunr.js
```
cat raw_data.json | node build-index.js > index.json
```
Generate html links that needs to be manually inserted into index.html.
```
cat all_job_ads.json | jq '.[] | [.url,.title,.identifier]' | jq -r '"<li data-question-id=\""+.[2]+"\"><h2><a href=\""+.[0]+"\">"+.[1]+"</a></h2><p>Arbetsförmedlingen</p></li>"' > links.html
```
## Run UI

Host the docs/ catalog in a webserver. It is a static web page.

## Support

Have you found a bug? Are you missing an example? Feel free to send a
suggestion of an example to make, and we will see of we can help you.

Please report issues in this Gitlab project.

## Roadmap

Working example in 2020 Q1.

## Contributing

Have you written a nice example you would like to share? Please make a
pull request!

## License

Apache License Version 2.0
