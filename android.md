### Environment Setup
make sure you have the ANDROID_SDK_ROOT in your PATH since RN uses it to find out your java setup
`export ANDROID_SDK_ROOT='wherever your androird studio sdk is'`
It works with Gradle 7.5.1 and it is committed to the repo

./gradlew --version
```
------------------------------------------------------------
Gradle 7.5.1
------------------------------------------------------------

Build time:   2022-08-05 21:17:56 UTC
Revision:     d1daa0cbf1a0103000b71484e1dbfe096e095918

Kotlin:       1.6.21
Groovy:       3.0.10
Ant:          Apache Ant(TM) version 1.10.11 compiled on July 10 2021
JVM:          11.0.16.1 (Homebrew 11.0.16.1+0)
OS:           Mac OS X 13.0.1 aarch64
````
also note that you need at least node 18 to make it run.

node --version

`v18.15.0`
### command to run the android app 

```
arch -x86_64 yarn install ; arch -x86_64 yarn android 
```
