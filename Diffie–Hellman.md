# How Diffie–Hellman Became the Backbone of Modern Encryption

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*qY5TtUCN9TYfvvsUlippqg.png)

We all use apps like WhatsApp, Signal, or Telegram on a daily basis. They promise us the maximum privacy with their famous slogan — “[**End-to-End Encrypted**](https://blog.whatsapp.com/end-to-end-encryption?lang=bg)**.**” The message stays between you and the person you’re talking to, not even the company running the servers can read it.

But if you pause for a second… how does that actually work? When you hit “send,” your text travels across the internet, passing through routers, ISPs, and data centers — all of which could potentially read it. Even if an attacker intercepts the network traffic, they somehow see only gibberish. So how do two phones, possibly thousands of miles apart, share a secret key to encrypt and decrypt messages _without ever sending that key over the network_ in the first place?

That’s where the magic of [**Diffie–Hellman**](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) key exchange comes in. It’s one of the foundational ideas that makes modern secure communication possible. Messaging apps like WhatsApp, Signal, and Telegram all rely on the [**Signal Protocol**](https://en.wikipedia.org/wiki/Signal_Protocol), and at its heart is a more advanced version of Diffie–Hellman called [**Elliptic Curve Diffie–Hellman**](https://en.wikipedia.org/wiki/Elliptic-curve_Diffie%E2%80%93Hellman#:~:text=Elliptic%2Dcurve%20Diffie%E2%80%93Hellman%20(,or%20to%20derive%20another%20key.) (ECDH).

In this article, we’ll break down what problem Diffie–Hellman solves, how it works step by step, the math behind it, and even build a simple implementation in JavaScript. By the end, you’ll not only understand the theory — you’ll see how this decades-old algorithm quietly powers the security of our digital world today.

## Core Idea

Consider that you are using the internet to send your friend a private message. It passes through servers, routers, and networks that are out of your control on its way. What happens if it is intercepted by someone in the middle? Before it comes, they could read it or even make changes.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*XYfJW1shCkTjhzWM0CiwxA.png)

You think, “All right, I’ll encrypt the message.” Well thought out. However, the decryption key is now required by your friend. Also, an attacker can also obtain that key if you send it over the same network, and once they do, your encryption is useless.

Although they don’t address the fundamental problem — how can two people agree on a secret key without ever sending it over the network? You could try hashing or signatures.

> **💡 Put yourself in that situation —** as a developer who doesn’t know about Diffie–Hellman or asymmetric encryption — _how would you solve it? Drop your idea in the comments before reading on._

## First Step to the Solution

So earlier, I talked about [Symmetric Encryption](https://www.geeksforgeeks.org/ethical-hacking/what-is-a-symmetric-encryption/) . Basically, it means using the same key to lock and unlock a message. Pretty straightforward… but here’s the catch

If a hacker manages to grab that key while it’s being shared, game over !! Your message isn’t private anymore.

Now, to fix that, we have [**Asymmetric Encryption**](https://www.cloudflare.com/learning/ssl/what-is-asymmetric-encryption/) , also called public-key cryptography. The idea is simple but powerful. You’ve got two keys. Public Key and Private Key.

![Symmetric & Asymmetric Encryption](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*MWJK4stJrzIhPm6mp4elLw.png)

The **public key** is used to lock, or encrypt, the message, and the **private key** is used to unlock it. Since the two keys are different, even if someone gets the public one, they _still can’t read_ your secret.

This approach _not only protects_ confidentiality, it also guarantees authenticity and security. Some of the well-known algorithms here are [**RSA**](https://en.wikipedia.org/wiki/RSA_cryptosystem), Diffie-Hellman, [Elliptic Curve Cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography), and ElGamal .

And fun fact — you already use these every single day: when you’re browsing on **HTTPS**, logging into **SSH**, using a **VPN**, sending secure emails, or even dealing with **blockchain**. Among them, Diffie-Hellman is one of the classics that really shaped modern secure communication.

## Does asymmetric encryption solves it?

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*71WY4s51ESmDwpf8UJj7fA.png)

Alright, let’s revisit our earlier chat example. This time, your friend creates a pair of keys — one private , one public . He sends you the public key , which is totally fine for anyone to see. You take that public key, use it to lock your message, and send it over.

Now, even if an attacker grabs the message, all they see is gibberish. Why? Because the public key can’t unlock it — only the private key can. Your friend receives it, uses his private key, and boom — he gets your actual message.

Sounds awesome, right? Encrypt with a public key, decrypt with a private key. Private stays private, public goes public. Super secure… or so it seems.

Here’s the catch: what if the attacker steps in before you even get your friend’s public key? Imagine this — your friend generates his keys and sends the public one. But on the way, the hacker intercepts it, swaps it out with **his own public key** , and passes that along to you.

Now, you think you’re encrypting your message for your friend with your friends Public Key, but actually, you’re using the hacker’s public key. He then intercepts the message again, unlocks it with **his private key**, reads everything, maybe even edits it, and then re-encrypts it with **your friend’s real public key** before sending it along.

End result? Both you and your friend think you’re talking securely… while the hacker is quietly sitting in the middle, reading and tweaking your messages without you even knowing.

## How Diffie Hellman Comes Into Play

So here’s the fix. Instead of directly sharing public keys that could be swapped, Diffie Hellman uses a bit of math magic.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*_6C1HHQlgmmFKnhBRyT8ng.png)

First, both Friend A and Friend B agree on two public numbers — a **prime** and a **base**. These values are visible to everyone, even an attacker. For example:

```
prime = 23
base  = 5
```

Next, Friend A secretly chooses a number:

```
secretOfA = 6
```

And Friend B also picks a private number:

```
secretOfB = 15
```

Now they calculate their public values using the formula:

```
publicOfA = (base ^ secretOfA) % prime
publicOfB = (base ^ secretOfB) % prime
```

If we do the math:

```
publicOfA = (5 ^ 6) % 23 = 15625 % 23 = 8
publicOfB = (5 ^ 15) % 23 = 30517578125 % 23 = 19
```

They exchange these public values. Remember, only `publicOfA` and `publicOfB` travel across the network — their secrets stay hidden.

## Get Saad Hasan’s stories in your inbox

Join Medium for free to get updates from this writer.

Subscribe

Subscribe

Remember me for faster sign in

Now for the final step. Each friend combines the received value with their own secret:

```
sharedKeyForA = (publicOfB ^ secretOfA) % prime
sharedKeyForB = (publicOfA ^ secretOfB) % prime
```

If we calculate:

```
sharedKeyForA = (19 ^ 6) % 23 = 47045881 % 23 = 2
sharedKeyForB = (8 ^ 15) % 23 = 35184372088832 % 23 = 2
```

Both sides end up with the same shared key, which in this case is:

```
sharedKey = 2
```

So at this point, both Friend A and Friend B have generated their **public keys**. These public values — `publicOfA` and `publicOfB` — are safe to share openly across the network. They can send them to each other, or even let others see them, without risking security. The important part is that their private secrets, `secretOfA` and `secretOfB`, never leave their side and remain completely hidden.

And here’s the magic: even though an attacker saw the prime, the base, and the public values, they can’t figure out the private secrets. Without those, the shared key remains safe.

## Why the Shared Key Stays Safe

And here’s the real magic. Even though a hacker can see the **prime**, the **base**, and both public values (`publicOfA` and `publicOfB`), they’re still stuck. Why?

Because to actually compute the shared key, you need either `secretOfA` or `secretOfB`. Without those private numbers, it’s practically impossible to reverse the math.

This is because Diffie Hellman relies on a problem called **discrete logarithm**, which is extremely hard to solve. In simple terms, given a result like `publicOfA = (base ^ secretOfA) % prime`, figuring out the original `secretOfA` is nearly impossible when the prime is large enough. That’s why even if the hacker collects all the public information, they cannot recreate the shared key.

So Friend A and Friend B now have a **secret key that only they know**, and they never actually sent that secret across the network. That’s why the attacker is locked out.

## The Chat Scenario with Diffie Hellman

Let’s bring this back to our original chat example. You want to send a private message to your friend. Instead of relying only on asymmetric encryption where the hacker could swap keys, you and your friend decide to use Diffie Hellman.

- First, you both agree on two numbers — `prime = 23` and `base = 5`. These are public, anyone can see them, even the hacker.
- Then, you (Friend A) choose a private secret number `secretOfA = 6`, and your friend (Friend B) also picks a private secret `secretOfB = 15`. These are never shared.
- You calculate your public value `publicOfA = 8`, and your friend calculates `publicOfB = 19`. These public values are exchanged. The hacker can copy them, but that’s fine.
- Finally, you take `publicOfB = 19` and combine it with your secret `secretOfA = 6` to get the shared key `sharedKeyForA = 2`. Your friend takes `publicOfA = 8` with his secret `secretOfB = 15` and also gets `sharedKeyForB = 2`. Now both of you have the same `sharedKey = 2`.

With this shared key ready, you can now encrypt messages. For example:

```
Message: "Hi"
Shared Key: 2
Encrypted Message: "Jk"
```

When your friend receives `"Jk"`, he uses the same shared key `2` to decrypt it:

```
Decrypted Message: "Hi"
```

The hacker, even though he saw `prime = 23`, `base = 5`, `publicOfA = 8`, and `publicOfB = 19`, still can’t recreate the shared key `2` without knowing either `secretOfA` or `secretOfB`. Sure, in theory he could try brute-forcing all possible combinations, but that’s exactly why in real-world use we don’t stick to small numbers like 23 and 5. Instead, we use **large primes and bases**, often 64-bit or even larger, which makes brute force practically impossible with today’s computing power.

And here’s another important point: even if the hacker somehow managed to guess the shared key, he still couldn’t do much with it. Modern protocols add additional layers of protection on top of Diffie Hellman, making sure the key alone isn’t enough to break the communication.

## Beyond Basics — ECDH and Forward Secrecy

Traditional Diffie Hellman works, but in practice we use a faster and more secure version called **Elliptic Curve Diffie–Hellman (ECDH)**. Instead of primes and exponentiation, it uses elliptic curves. The big win? Smaller keys, stronger security. For example, a **256-bit ECDH key ≈ 3072-bit DH key** in strength.

Here’s a quick demo. Suppose Friend A and Friend B agree to use the curve **P-256**.

- Friend A picks a private key: `secretOfA = 6`
- Friend B picks a private key: `secretOfB = 15`
- Using the curve math, they each generate public keys (`publicOfA`, `publicOfB`) and exchange them.
- Finally, each side combines the other’s public key with their own secret, and both arrive at the **same shared key** — just like in classic DH, but with elliptic curves doing the math behind the scenes.

Now, add **Forward Secrecy** on top. Instead of reusing the same keys, every chat session spins up a fresh, temporary key pair. When the session ends, those keys are thrown away. That means even if someone steals your private key later, your past conversations stay safe.

This combo — **ECDH plus Forward Secrecy** — is what powers modern secure apps like WhatsApp, Signal, and TLS in your browser.

## Summary and Takeaways

We started with the basics of **symmetric encryption**, saw its weakness in sharing the same key, then moved to **asymmetric encryption** and discovered the risk of key swapping. That set the stage for **Diffie Hellman**, which introduced a clever way to generate a shared secret over an insecure channel. We worked through the math step by step and even mapped it into a real chat scenario.

Then we went beyond basics with **Elliptic Curve Diffie–Hellman (ECDH)**, which gives us the same security but with smaller keys and faster performance, and we saw how **Forward Secrecy** ensures past conversations remain safe even if future keys are compromised.

The big takeaway? Encryption isn’t just about locking messages. It’s about _how_ you agree on the lock without ever exposing the key. Diffie Hellman — and its modern versions like ECDH — are the unsung heroes that make secure communication possible every day.

If you found this article helpful, I’d truly appreciate it if you could **clap on Medium**, share it with friends, or pass it along to anyone curious about encryption. Your support helps me keep writing and sharing more deep dives like this.
