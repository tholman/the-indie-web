## Inspiring Online

_[Inspiring Online](http://inspiring.online) is an open source blog used to share interesting, and inspiring things from the online landscape._

### The idea

Inspiring Online aims to be a blog for those looking for encouragement, and inspiration in the tech world, but is also an experiment. The entire blog is open source, so anyone can submit amendments to posts, fix spelling mistakes, add discussion links, and create new posts too! Ideally, it's a great starting area for someone to enter the open source world!

### Contributing

There are a lot of ways to contribute to this project. Really, we want what you have! This is a great place to get started with open source code. Break down that initial barrier (it was really scary for me, but once it's down, the floodgates are open for you).

Here are a few ways to get started:

1. **Submit a pull request from an approved proposal.** This means, adding the image, and the Markdown file to create the post, as well as writing a little something about it. Not too much (we're not really that wordy)... Kapow, done!
2. **Submit an awesome website!** This involves opening an issue with `[proposal]` as the first word. And a link to something you think is creative and awesome.
3. **Fix a spelling mistake!** I'm not perfect at all, I must make 100 of these a day. Even if it's a small pull request, we'd love to see it!

#### Running locally

Start by installing [Bundler](http://gembundler.com), if you don't already have it:

```
gem install bundler
```

Now, if you're going to be making changes to this site you'll want to make a fork of the repository. This makes it easier for you to make changes and get them reviewed before they're added to the live site.

Once you've forked the repository you'll want to access that code on your own computer.
To do this just clone the repository down to your local machine:

```
git clone https://github.com/username/inspiring-online.git
```

(Make sure to replace `username` with your username.)

The last thing you need to do to run locally is do a `bundle install` to install the required gems.

Then just run `jekyll serve` to see the website running on `http://localhost:4000`.

If you get any errors or warnings, try to run `bundle exec jekyll serve`.

#### Making a pull request

Let's say you've made some changes and you want to see them on the site.

1. Commit the changes
2. Push the changes
3. Click "Pull request" on your fork's repository page
4. Type up an explanation of what you've done and what issue(s) it solves
5. Listen and respond to the questions and suggestions of others. **Remember:** This an _open source_ site; everyone gets a say.
6. Hopefully, get your pull request merged!

#### Keeping your fork up to date

Let's say someone's made changes to the site or one of your pull requests has been merged. You probably want that code on your fork, right?

The first thing you need to do (you only need to do this once) is establish the main repository as a remote for your fork.

```bash
git remote add upstream https://github.com/tholman/inspiring-online.git
```

You can substitute `upstream` for whatever you want to call the remote.

Then, you want to get the code from the remote:

```
git fetch upstream
```

(If you used something other than `upstream` make sure you use that.)

Lastly, you want to pull that code into your forked repository. This is where it's important you have any changes you may have made committed or stowed because there could be merge conflicts.

```
git pull upstream gh-pages
```

(Again, use the name you set the remote to if you didn't use `upstream`.)

And there you go! From now on, if you want to pull changes from the main repository into your forked one you just need to type:

```
git fetch upstream
git pull upstream gh-pages
```

(You remember what to do with `upstream`, right?)

#### Showing changes on a fork

If you've made some big changes to the site and you want to show everyone what you've done before it gets merged you can push your changes and view it on your fork. The link for this would be:

```
username.github.io/inspiring-online
```

(Replacing `username` with your username, of course.)

If you go view your fork right now you'll see something that looks almost nothing like the actual site. This is because of the way assets are linked and the way Github Pages works. To overcome this, you need to go into `_config.yml`.

Turn:
```
baseurl: '/'
```
Into:
```
baseurl: '/inspiring-online/'
```
This will make all of the assets link properly and you can then correctly view and show off your changes on your fork. The only thing you need to remember is to change it back to `baseurl: '/'` before creating/merging a pull request.

### What we like

Naturally, for Inspiring Online to keep a good quality, we can't accept any old post. For new people, there should be a bunch of `[proposal]`s on the project's [issues page](https://github.com/tholman/inspiring-online/issues); these are great starting points. Similarly, if you spot a mistake or problem in a post, you can patch that up too! I see so many pull requests fixing readmes ... they're totally welcome here!

We're looking for posts, images, and links that inspire people. These can range from great talks to creative code to awesome design. Here're a few little examples:

- [Emotions With CSS](http://inspiring.online/emotions-through-css) is an awesome talk. Well worthy!
- [Music Emojis](http://inspiring.online/music-emojis) is a great little design project.
- [This glitch effect](http://inspiring.online/glitch) is an amazing example of creative code.

### What we don't like

Sadly, we don't really want everything... we've got to keep the quality up, and some things can taint that.

- Please don't post your own things. I know self promoting is fun, but it's kind of against the spirit of what we're trying to do.
- Let's keep advertising to a minimum. That's not to say it's ruled out, sometimes advertising is really really creative... we just don't want to be full of it.
- Let's try to keep the articles based around new and upcoming things. [Ro.me](http://ro.me) is still amazing, but we've seen it before!

If ideas and proposals really fill up in the GitHub issues, we might move to a link drop at the end of the week including a lot of things.

Most importantly, don't be offended if we turn something down. We're here to work with you and make the most out of your contributions, and ideally won't have to turn much down!

### Bear with us!

Nothing is perfect. We're totally still figuring this whole thing out. Got a problem? – please open up an issue on the repository. That way, you're guaranteed to get something back.

### License

See the [license](LICENSE.md) file for license rights and limitations (MIT).
