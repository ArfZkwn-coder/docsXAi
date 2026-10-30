---
title: "Set Up the Connector in Claude"
description: "Get your personal docs-publisher URL from the site owner's Telegram bot, add it to claude.ai, and start writing tutorials."
sidebar_position: 1.5
---

# Set Up the Connector in Claude

This guide is for team members who want to write and edit tutorials on this site by chatting with Claude. You get a personal connector URL from the site owner's Telegram bot, add it to your Claude account once, and then ask Claude for what you need, such as "write a tutorial on webhooks".

It takes about five minutes.

## Before you start

You need:

- **A Claude account** that can add custom connectors, at [claude.ai](https://claude.ai).
- **Telegram**, to request access from the site's bot, [@ArifDocsAgentic_bot](https://t.me/ArifDocsAgentic_bot).

## Step 1: Request access on Telegram

1. Open **[@ArifDocsAgentic_bot](https://t.me/ArifDocsAgentic_bot)** in Telegram and press **Start**. On a computer, the link opens Telegram Desktop or Telegram Web.
2. Send:

   ```text
   /access
   ```

3. The bot replies that your request has been sent to the owner.

The owner gets a message with your name and a ready-made approval command. As soon as they approve, the bot sends you a message containing **your personal connector URL**. It looks like this:

```text
https://docs-publisher.example.ts.net/mcp/3f9a1c...
```

:::caution Your URL is a password
The long code at the end of the URL is your personal key. Anyone who has your URL can make changes in your name. Don't share it, paste it into documents or post screenshots of it. Delete the bot's message once you've added the connector. If your URL leaks, tell the site owner: they can turn it off at once and send you a new one.
:::

## Step 2: Open Connectors

1. Go to [claude.ai](https://claude.ai) and sign in.
2. Click **Customize** in the left sidebar, then **Connectors**. (**Settings → Connectors** also leads here.)

## Step 3: Add the connector

1. Click **+ Add**, then **Add custom connector**.
2. Fill in the form:
   - **Name:** `docs-publisher`
   - **URL:** paste your personal connector URL from Telegram, all of it, with no spaces.
   - Leave the OAuth and advanced settings empty.
3. Click **Add**.

Claude shows **Connected to docs-publisher**, and the connector appears under **Yours** with six tools.

## Step 4: Choose what Claude may do without asking

Each tool can be set to **Allow** (Claude uses it freely), **Needs approval** (Claude asks you each time) or **Blocked**. Open the connector in your list to change them. A good starting point:

| Tool | What it does | Suggested setting |
| --- | --- | --- |
| List tutorials | Lists the pages on the site | Allow |
| Read tutorial | Reads a page's current text | Allow |
| Publish tutorial | Adds a new page or replaces one | Needs approval |
| Edit tutorial | Changes part of a page | Needs approval |
| Delete tutorial | Removes a page | Needs approval |
| Deploy site | Rebuilds the live site from approved changes | Needs approval |

With **Needs approval**, Claude shows exactly what it's about to send before anything changes, so you can check it.

## Step 5: Test it

Start a new chat and send:

> Using the docs-publisher connector, list the tutorials in my docs.

Claude replies with the site's pages, for example `docs/getting-started.md`. If it does, you're set up. If you get an error, see [Troubleshooting](#troubleshooting).

## Writing and editing tutorials

Ask in plain words. Claude picks the right tool:

- "Write a beginner tutorial on setting up webhooks and publish it as `guides/webhooks`."
- "Read the getting-started tutorial and fix any spelling mistakes."
- "In the FAQ, add a question about password resets."
- "Delete the old `guides/legacy-api` tutorial."

Tips for good results:

- **Say where it goes.** A path like `guides/webhooks` puts the page in the `guides` section of the sidebar.
- **Give Claude your material.** Paste notes, steps or screenshots into the chat; Claude writes a better tutorial from real details.
- **Read before you approve.** With **Needs approval**, check the text Claude is about to publish.

## What happens after you publish

What happens next depends on whether the site owner has marked you as **trusted**:

| You are | Your changes | When they're on the site |
| --- | --- | --- |
| **Reviewed** (the default) | Become a **pull request**, a proposed change the owner reviews | After the owner merges and deploys it |
| **Trusted** | Go straight onto the site | About a minute later, automatically |

You can tell which one happened from Claude's reply:

- **"Pull request: …"** means your change is waiting for review. Its title ends with your name, for example `docs: publish "Webhooks" (by alice)`.
- **"The site is being deployed and will be live in a minute or two"** means it's going live now. Refresh the page after a minute to see it.

Either way, every change records who asked for it.

## For site owners: managing access

People request access through your Telegram bot, and you manage everything by replying to it. Only your own chat can use these commands:

| Command | What it does |
| --- | --- |
| `/approve CHAT_ID NAME` | Creates a key for that person and sends them their URL. The bot gives you this command, ready to send, when someone asks for access. |
| `/trust NAME` | Their changes publish directly and go live automatically. |
| `/untrust NAME` | Back to pull requests that you review. |
| `/revoke NAME` | Turns their URL off immediately. |
| `/list` | Shows who has access. |
| `/myid` | Shows your own chat ID. |

Only trust people whose changes you're happy to see on the live site without checking first. Everything takes effect immediately, with nothing to restart.

You can also manage keys on the server that runs the connector:

```bash
docker exec docs-publisher node src/keys-cli.js add alice --trusted
```

```bash
docker exec docs-publisher node src/keys-cli.js list
```

The same tool has `trust`, `untrust` and `remove`.

## Troubleshooting

**The bot doesn't reply to `/access`**: make sure you pressed **Start** first. If it still says nothing, ask the site owner to check the bot.

**I sent `/access` but got no URL**: the owner hasn't approved you yet. The URL arrives in the same chat as soon as they do.

**Claude can't connect, or adding the connector fails**: check that you pasted the whole URL, including the long key at the end, with no spaces. If it's still refused, your access may have been turned off; ask the site owner for a new URL.

**Claude doesn't use the connector**: mention it by name, as in "Using the docs-publisher connector, …". Also check that the connector is switched on for the chat, under the **+** menu in the message box.

**A GitHub error such as "Bad credentials" or "failed (401)"**: the problem is on the server side. Tell the site owner; there's nothing to fix in your Claude settings.

**My change isn't on the live site**: if Claude gave you a pull request link, it's waiting for the owner's review. If Claude said the site is being deployed, wait a minute or two and refresh. A changed page can stay cached in your browser for a while.

**I shared my URL by mistake**: tell the site owner. They can revoke your key and approve you again, which sends you a new URL. Then update the URL on your connector in claude.ai, or remove it and add it again.
