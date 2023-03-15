#  Dev Instructions
## Running on iPhone
https://developer.apple.com/forums/thread/64973
## Notes
* In order to run native code on iPhone, you need an iOS directory and the associated files.
* rbenv for your local ruby env is helpful for the CocoaPods reqs (see https://reactnative.dev/docs/next/environment-setup)
```rbenv local 2.7.6```
* Before building the iOS specific files please do the follow from the main directory:
```rm -Rf node_modules;arch -x86_64 yarn cache clean;arch -x86_64 yarn install;```
* Then from this iOS directory you can do something like:
```rm -Rf build;rm -Rf Pods;arch -x86_64 pod install --repo-update;```
* You should also import the workspace or project file into XCode and it should look like:
![image](https://user-images.githubusercontent.com/681493/208785290-1a6bbbd6-9ded-4616-ad54-70f915dde6ec.png)
* You will need the prism-swift-sdk:
![image](https://user-images.githubusercontent.com/681493/210178270-9ce14ab0-a590-4767-815a-8c1d831cb01a.png)
* You can run the app on an iOS simulator or iPhone by hitting the play button (it will take some time for the app to build and deploy)
* If you are getting an error: 
```
Value is undefined, expected an Object

@[native code]

reanimated::REAIOSErrorHandler::raiseSpec()
    REAIOSErrorHandler.mm:18
reanimated::ErrorHandler::raise()::'lambda'()::operator()()
decltype(static_cast<reanimated::ErrorHandler::raise()::'lambda'()&>(fp)()) std::__1::__invoke<reanimated::ErrorHandler::raise()::'lambda'()&>(reanimated::ErrorHandler::raise()::'lambda'()&)
void std::__1::__invoke_void_return_wrapper<void, true>::__call<reanimated::ErrorHandler::raise()::'lambda'()&>(reanimat
```
Then run your metro server before starting your iPhone simulator:
```
yarn start ios --reset-cache
```
* Here is a tour of the interface as of today: https://www.youtube.com/watch?v=YwLbjOrIwas
