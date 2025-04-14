# conference

Contents behind the https://jconfdominicana.org web site. 


This site is baked with JBake, a static site generator.
The idea behind [JBake](http://www.jbake.org) is very simple: contents is written using a markup language and "baked" with template engines into actual HTML. Everything is generated statically and you can upload the generated site wherever you want.

## How to contribute

There are a few guidelines that we need contributors to follow so that we can have a chance of keeping on
top of things.

## Prerequisites

* A Github account
* [Gradle](http://www.gradle.org)

## Getting Started

* Fork the repository
* Clone your fork repository 

Example:

```bash
git clone https://github.com/JavaDominicano/conference.git
cd conference
```

### Exploring the project structure

The directory src/jbake contains the classic JBake folder contents:

```bash
src
 |-- jbake
       |-- assets    : static assets (images, css, ...)
       |-- content   : blog posts, ...
       |-- templates : HTML templates (by default, uses FreeMarker, but we are using Thymeleaf)

```

To do any change, you have to explore [JBake](http://www.jbake.org) and [Thymeleaf](https://www.thymeleaf.org) a template engine for Java.

### Layouts configuration

* layout.display.counter : enable/disable counter section. Default is **true**
* layout.display.speakers : enable/disable speakers section. Default is **false**
* layout.display.schedule : enable/disable schedule section. Default is **false**
* layout.display.tickets : enable/disable tickets section. Default is **false**
* layout.display.sponsors : enable/disable sponsors section. Default is **false**
* layout.display.supporters : enable/disable supporters section. Default is **false**
* layout.display.gallery : enable/disable gallery section. Default is **false**

### Other properties configuration

* layout.display.cfp : enable/disable cfp button. Default is **false**
* layout.cfp.url : cfp url
* layout.cfp.close.date : call for paper close date. Ex. **layout.cfp.close.date=2023-05-31 11:55 AST**
* layout.buytickets.url: tickets platform url
* layout.display.buytickets.menu.button : enable/disable buytickets button in the menu navigation. Default is **false** 
* layout.display.buytickets.index.button : enable/disable buytickets button in the home page. Default is **false**
* layout.display.tickets.onsale.soon: enable/disable tickets on sale soon section. Default is **false**
* layout.display.tickets.sale.startdate: ticket sale start date. Ex: **layout.display.tickets.sale.startdate=2023-05-31 11:55 AST**
* layout.display.tickets.price:  enable/disable tickets price section. Default is **false**
* layout.display.tickets.sale.enddate:  ticket sale end date. Ex: **layout.display.tickets.sale.startdate=2023-05-31 11:55 AST**
* layout.display.tickets.soldout:  enable/disable soldout section. Default is **false**
* layout.display.page.spa: enable/disable spa mode. Default is **true**  
* layout.display.organizers.page: enable/disable presentations page. Default is **false**
* layout.display.presentations.page: enable/disable presentations page. Default is **false**
* layout.display.about.index.video.url: enable/disable home page about section video. Default is **false**
* layout.about.index.video.url: home page about section video url. 
* layout.display.past.speakers: enable/disable past speakers

### Generating the output

You can generate the site by running the following command:

```bash
./gradlew -i jbake
```

After the rendering step, you should now have a new directory:

```bash
build
  |-- jbake
```

Into which you will find the generated HTML contents.

### Running the site

```bash
./gradlew bakePreview
```

Browse to http://localhost:8080


### Submitting Changes

* Push your changes to your fork.
* Submit a pull request.

### Additional Resources

* [General GitHub documentation](http://help.github.com/)
* [GitHub pull request documentation](http://help.github.com/send-pull-requests/)

### Contributors

[Contributors](https://github.com/JavaDominicano/conference/graphs/contributors)
   
<a href="https://github.com/JavaDominicano/conference/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=JavaDominicano/conference" />
</a>