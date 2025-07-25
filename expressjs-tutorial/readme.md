_Remember that Node.js isn't anything special, it's just a runtime environment that you can simply use to execute JavaScript code on the server-side, or your local computer, instead of the browser. If you already know JavaScript from using it on the client-side, then you honestly will not have any trouble with understanding JavaScript on the server-side. There will be differences, because the browser has its own APIs, and Node.js has its own APIs (remember, browsers have their own JS engine that can interpret and execute code)._

_All you are doing is just writing JS code and having it run on the server side, aka your local machine, and you use Node.js to do that. While Node.js may have a lot of built-in APIs and functionalities, such as the file system API (fs) or the http API, trust me, you will know when you will need to use those APIs when the time comes as you're developing your project. Don't worry about all of those native APIs Node.js provides, every single runtime environment or language will have their own that you don't need to memorize or know until you need to use them. As long as you know how to write some JS code, and execute it on your local machine through the command line, then you should have no problem learning Express.js, or any JS framework._

_Thus, Express.js is one of the best frameworks to learn as a complete newbie because of its unopinionated nature._

# HTTP Stateless nature

Imagine you're ordering food at a fast-food counter:
You ask for a burger (Request #1) → The cashier gives you a burger but immediately forgets you.
You then ask for fries (Request #2) → The cashier gives you fries but has no idea you were the same person who ordered the burger earlier.

This is how HTTP works by default—each request is treated as brand new, with no memory of past interactions. The server doesn’t "remember" you between requests.

Why Is This a Problem?
If the server forgets you after every request, how can it handle things like:

Logged-in users (e.g., keeping you signed in on Facebook).

Shopping carts (e.g., remembering what you added to Amazon).

Personalized settings (e.g., your theme preference on YouTube).

How Do We Fix This? (Common Solutions)
Since HTTP is stateless, we add tricks to "remember" users:

1. Cookies (Like a Name Tag)
The server gives your browser a small piece of data (cookie) to store.

Example: When you log in, the server says: "Here’s a cookie with your ID. Show it next time so I know it’s you."

Next request: Your browser sends the cookie, so the server recognizes you.

2. Sessions (Like a Locker with a Key)
The server stores your data (e.g., login status) in a "session" on its side.

It gives your browser a session ID (usually via a cookie).

Next request: You send the session ID, and the server looks up your data.

3. Tokens (Like a Concert Wristband)
Used in APIs (e.g., mobile apps). After login, you get a token (e.g., JWT).

Next request: You send the token in the header to prove who you are.

4. URL Parameters (Like Writing Down Info)
Sometimes, data is passed in the URL itself (e.g., ?user_id=123).

Not secure for sensitive info but works for simple cases.

