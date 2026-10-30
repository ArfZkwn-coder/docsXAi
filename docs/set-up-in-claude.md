---
title: "Set Up the Connector in Claude"
description: "Add the docs-publisher connector to claude.ai with your personal URL, choose its permissions, and start writing tutorials."
sidebar_position: 1.5
---

# Set Up the Connector in Claude

This guide is for team members who want to write and edit tutorials on this site by chatting with Claude. You add the **docs-publisher** connector to your Claude account once, then ask Claude for what you need, such as "write a tutorial on webhooks". Your changes go to the site owner for review before they appear on the site.

It takes about five minutes.

## Before you start

You need two things:

- **A Claude account** that can add custom connectors, at [claude.ai](https://claude.ai).
- **Your personal connector URL** from the site owner. It looks like this:

  ```text
  https://docs-publisher.example.ts.net/mcp/3f9a1c...
  ```

:::caution Your URL is a password
The long code at the end of the URL is your personal key. Anyone who has your URL can propose changes in your name. Don't paste it into chats, documents or screenshots. If it leaks, ask the site owner for a new one; the old one stops working at once.
:::

## Step 1: Open Connectors

1. Go to [claude.ai](https://claude.ai) and sign in.
2. Click **Customize** in the left sidebar, then **Connectors**. (**Settings → Connectors** also leads here.)
3. Click the **Yours** tab to see the connectors you've already added.

## Step 2: Add the connector

1. Click **+ Add**, then **Add custom connector**.
2. Fill in the form:
   - **Name:** `docs-publisher`
   - **URL:** paste your personal connector URL, all of it, with no spaces.
   - Leave the OAuth and advanced settings empty.
3. Click **Add**.

Claude shows **Connected to docs-publisher**, and the connector appears in your list with six tools.

## Step 3: Choose what Claude may do without asking

Each tool can be set to **Allow** (Claude uses it freely), **Needs approval** (Claude asks you each time) or **Blocked**. Open the connector in your list to change them. A good starting point:

| Tool | What it does | Suggested setting |
| --- | --- | --- |
| List tutorials | Lists the pages on the site | Allow |
| Read tutorial | Reads a page's current text | Allow |
| Publish tutorial | Adds a new page or replaces one | Needs approval |
| Edit tutorial | Changes part of a page | Needs approval |
| Delete tutorial | Removes a page | Needs approval |
| Deploy site | Publishes approved changes to the live site | Needs approval |

With **Needs approval**, Claude shows exactly what it's about to send before anything changes, so you can check it.

## Step 4: Test it

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

Your change doesn't go straight onto the site. Every publish, edit or delete becomes a **pull request**, a proposed change that the site owner reviews.

1. **You ask Claude** for a change, and Claude replies with a link to the pull request.
2. **The site owner reviews it** on GitHub. Its title ends with your name, for example `docs: publish "Webhooks" (by alice)`.
3. **The owner merges it** when it's ready, or asks you for changes.
4. **The site is deployed**, either by the owner or by anyone asking Claude to "deploy the site". Only merged changes go live.

So if your change isn't on the site yet, it's usually waiting for review or for the next deploy.

## For site owners: giving someone access

Each person gets their own key, so you can see who asked for each change and remove one person without affecting anyone else. On the server that runs the connector:

```bash
docker exec docs-publisher node src/keys-cli.js add alice
```

This prints Alice's personal connector URL; send it to her privately. To see who has access, or to cut someone off:

```bash
docker exec docs-publisher node src/keys-cli.js list
```

```bash
docker exec docs-publisher node src/keys-cli.js remove alice
```

Removing a key takes effect immediately; there's nothing to restart.

## Troubleshooting

**Claude can't connect, or adding the connector fails**: check that you pasted the whole URL, including the long key at the end, with no spaces. If it's still refused, your key may have been removed; ask the site owner for a new URL.

**Claude doesn't use the connector**: mention it by name, as in "Using the docs-publisher connector, …". Also check that the connector is switched on for the chat, under the **+** menu in the message box.

**"A deploy is already running"**: someone else is deploying the site. Wait a minute or two and ask again.

**A GitHub error such as "Bad credentials" or "failed (401)"**: the problem is on the server side. Tell the site owner; there's nothing to fix in your Claude settings.

**My change isn't on the live site**: it needs to be merged and then deployed. Check the pull request link Claude gave you to see whether it's been merged.

**I shared my URL by mistake**: ask the site owner to remove your key and give you a new one, then update the URL on the connector in claude.ai. If that isn't possible, remove the connector and add it again.
