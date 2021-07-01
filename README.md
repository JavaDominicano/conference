# conference
Contents behind the https://jconfdominicana.org web site 


This site is baked with JBake, a static site generator.
The idea behind [JBake](http://www.jbake.org) is very simple: contents is written using a markup language and "baked" with template engines into actual HTML. Everything is generated statically and you can upload the generated site wherever you want.

# How to contribute

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


### Generating the output
you can generate the site by running the following command:
```bash
./gradlew -i jbake
```

after the rendering step, you should now have a new directory:
```bash
build
  |-- jbake
```
into which you will find the generated HTML contents.

### Running the site
```bash
./gradlew bakePreview
```
Browse to http://localhost:8080


## Submitting Changes

* Push your changes to your fork.
* Submit a pull request.

# Additional Resources

* [General GitHub documentation](http://help.github.com/)
* [GitHub pull request documentation](http://help.github.com/send-pull-requests/)
