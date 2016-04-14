# portohydra.time-share.gr
The http://portohydra.time-share.gr web site implemented in Jekyll.

# Template helpers

To add a pdf file attachment, add it in the content folder and then link it in the page using the following
short code:
```
{% include pdfFile.html file="AitisiXronomeriston.pdf" name="Enrollment application form" %}
```
In the end of the post, don't forget to add
```
{% include getAdobe.html %}
```
To mark a post as draft, add in the meta tags
```
isDraft: true
```
If you don't want a page to appear in the sitemap.xml add the following tag
```
sitemap_exclude: true
```

# Day-2-day admin tools
Here is a list of services that relate to admin activities:
- [Google search console](https://www.google.com/webmasters/tools/dashboard?hl=en&siteUrl=http://portohydra.time-share.gr/)
- [Google custom search](https://cse.google.com/cse/all)
- [Google analytics](https://analytics.google.com/analytics/web/)
- [Shareaholic](https://shareaholic.com/publisher_tools)

# Development in local machine

If you want to do local development (and not directly editing files in github) you will have to setup your box.

## How to setup dev environment

Download and install ruby (2.2.3 x64 was currently available) from http://rubyinstaller.org/downloads/
Make sure you add the binaries to the path (there is an option in the installation)

Download the Development KIT (DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe) from the same location.
Run it to extract it somewhere (c:\Ruby22-x64\devkit\). 
Then cd to it, run 
```
ruby dk.rb init 
ruby dk.rb install
```
to bind it to ruby installations in your path.

Update Install.bat and Update.bat files to match your devkit location.

Open a command prompt and run the Install.bat in the root of the gh-pages branch. If you have network issues and you get ETIMEDOUT errors, issue the following command until you get all the gems
```
bundle install
```

## How to develop

Open a command prompt and run the Update.bat in the root of the gh-pages branch to update the packages.
Then use the Local.bat file to run the server.

Navigate to http://localhost:4000 to see your local site. 

Make sure you save the files using UTF-8 without signature (otherwise jenkyll won't understand the header to parse the file).

## Clean up css

In order to cleanup the drup css we used the uncss node module. Install [node.js](https://nodejs.org/) and add the following packages:
```
npm install uncss
npm install walk
```
Then, having jekyll runing, in the root of this site execute the script:
```
node CleanupCss.js
```
This will produce a style.css file in the root which you can use to replace the existing one in the css folder.

# Before you reuse this site

Tips on things build in this Jekyll template

## On the translation topic

We are using [Html Iso language for each post](http://www.w3schools.com/tags/ref_language_codes.asp).
We followed a technique similar to https://www.sylvaindurand.org/making-jekyll-multilingual/.

## Various scripts

We have added shareaholic support. Create an account at https://shareaholic.com and get your site id. Place that in the _config.yml. Create an Inline App for your sharing buttons and set in the config the app id from the code snippet:
```
<div class='shareaholic-canvas' data-app='share_buttons' data-app-id='23126307'></div>
```

## Importing from drupal

Use the following mysql script to get the posts 
```
SELECT n.title, fdb.body_value, 
                      fdb.body_summary, 
                      DATE_FORMAT(FROM_UNIXTIME(n.created),'%Y-%m-%d'), 
                      n.status, 
                      n.nid
               FROM portohydradb.drupal_node AS n, 
                    portohydradb.drupal_field_data_body AS fdb
               WHERE n.nid = fdb.entity_id 
               AND n.vid = fdb.revision_id
               order by n.created asc
```
Note that attachments are not visible in this query.

## Custom pagination

To overcome the poor pagination support of Jekyll, we created a custom one. This requires us to to manually add the pages (news.html).
Just copy past the news_page_2.html and change the page_no and the title.
This allows us to have custom pagination per language which wouldn't be feasible without plugin support.
