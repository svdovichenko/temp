### Notes on Web Worker sample page

#### 1 Don't worry about the "improved solution".

The "improved" solution Cameron features in class is irrelevant to Web Workers.

Working through the improved solution would be good practice for improving a bad for-loop, and for getting acquainted with image manipulation algorithms, but I only want to focus on Web Workers!

The code I wrote (in folder \#2) totally ignored this "extra credit" aspect of the quiz.

In fact, I'm happy with them taking a long time to run, because it justifies the existence of my Web Worker even more!

Furthermore, it's more realistic at our level of development to assume that image manipulation is a solved problem, and find the right library code to use, rather than improving faulty library code.

#### 2 About the state of "my solution":

I was experimenting with using a top-level "organizational object" to hold all the code I was writing.

This basically means that I took all of Cameron's global variables and placed them into my organizational object: `iA`.

If I was organizing this code my way, I would probably not use the same variables 1-for-1 in my `iA` as he used globally, but I didn't want to totally re-architect this thing.

You might see me using some unfamiliar patterns in my code, and you are welcome to ask questions about anything.

But you should see folder \#3 "Cameron solution" and his explanation video at...

* https://www.udacity.com/course/viewer#!/c-ud860/l-4138168623/e-4184098558/m-4146278980

...for the default answer from Cameron, in his own words, and the code in \#3 should be just as he says.

#### 3 Running a local server

To use any of the code in this repository, running a local server is mandatory!!

(Although if you can push something to GitHub Pages (a web page hosted at: `https://YourGitHubName.github.io`) then that will definitely work in lieu of a local server.)

Please ask in the team chat if you need help setting up a local server.

This is the order of my preference for easily setting up a local server. I would prefer to try the top method first, then look down if you can't do that.

* the Python module "SimpleHTTPServer" will host any `index.html` in any folder you point it to
* Node and NPM offer [http-server](https://www.npmjs.com/package/http-server)
* if you have another runtime, such as Ruby, installed, perhaps that will have an easy local server package
* start looking into [ngrok.com](https://ngrok.com/)
* all other solutions you may find on forums

#### References

This takes you to the classroom:

* https://www.udacity.com/wiki/ud860
