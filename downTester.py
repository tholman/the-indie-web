import os
import urllib
import sys

posts = {}

for f in os.listdir('_posts'):
    with open("_posts/{}".format(f)) as m:

        down = False

        # Seperate the file into lines
        lines = m.read().split("\n")

        for line in lines:

            if line[0:9] == "siteDown:":
                # If the site's already down
                if line[10:] == "true":
                    # Mark the site as down so we can't add it to the list
                    down = True
                    # Attempt to remove it in case siteDown was after link
                    posts.pop(f)

            # If the line contains the link for the post
            if line[0:5] == "link:" and not down:
                # Add to list of urls
                posts[f] = line[6:]


for site in posts.keys():

    req = urllib.request.Request(
        posts[site],
        data=None,
        headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
        }
    )

    try:
        code = urllib.request.urlopen(req).getcode()
    except (urllib.error.HTTPError, urllib.error.URLError) as e:
        print(posts[site], e, site)

    if code != 200:
        print(posts[site], code, site)
