---
title: "Getting Started"
description: "Bake six silky caramel puddings from scratch: ingredients, oven setup, caramel, custard and troubleshooting."
sidebar_position: 1
---

# Getting Started

By the end of this guide you will have shipped one batch of six caramel puddings (crème caramel): a glossy caramel layer on top and a smooth, barely-set custard underneath. Active time is about 25 minutes, plus baking and chilling.

## Before you start

**Runtime requirements**

- An oven that holds 160 °C (320 °F)
- Six ramekins, about 125 ml each
- A deep baking tray that fits all six ramekins
- A small heavy-bottomed saucepan, a whisk, a fine sieve and a kettle

**Dependencies**

| Package | Quantity | Used in |
| --- | --- | --- |
| Granulated sugar | 100 g | `caramel` |
| Water | 3 tbsp | `caramel` |
| Whole milk | 500 ml | `custard` |
| Eggs, large | 4 | `custard` |
| Sugar | 80 g | `custard` |
| Vanilla extract | 1 tsp | `custard` |

:::note
Use room-temperature eggs. They blend into the milk without lumps and the custard bakes more evenly.
:::

## Step 1: Configure the environment

Preheat the oven and boil the kettle for the water bath later.

```yaml title="oven.yaml"
mode: conventional   # no fan if you can avoid it
temperature: 160C
rack: middle
```

## Step 2: Build the caramel

Put the sugar and water in the saucepan over medium heat. Do not stir. Swirl the pan gently until the sugar dissolves, then let it cook until it turns a deep amber.

```text title="Expected output"
Clear syrup -> pale gold -> deep amber (about 6-8 minutes)
```

Pour the caramel straight into the ramekins and tilt each one so the base is coated. Work quickly, because it hardens fast.

:::caution
Hot caramel is far hotter than boiling water and sticks to skin. Keep a bowl of cold water nearby and never taste it straight from the pan.
:::

## Step 3: Compile the custard

1. Warm the milk in a clean pan until steaming, but not boiling.
2. In a bowl, whisk the eggs, the 80 g of sugar and the vanilla until combined. Avoid whipping in air.
3. Pour the warm milk into the egg mixture in a slow stream while whisking.
4. Strain the mixture through a fine sieve into a jug.

```bash title="Pseudo-script of the whole step"
warm milk
whisk eggs sugar vanilla
pour milk into eggs slowly
strain
```

:::tip
Straining is the cheapest way to prevent bugs in production: it removes egg strands and gives a silky texture.
:::

## Step 4: Deploy to the oven

Place the ramekins in the baking tray and fill each one with custard. Pour hot water into the tray until it reaches halfway up the ramekins, then slide the tray into the oven.

Bake for 40 to 45 minutes. Treat the following as your health check:

- The edges are set.
- The centre still wobbles slightly when you nudge the tray.

```text title="Health check"
status: ready   if edges=set AND centre=slight wobble
status: wait    otherwise (check again in 5 minutes)
```

## Step 5: Cache and release

1. Lift the ramekins out of the water bath and let them cool to room temperature.
2. Cover and refrigerate for at least 4 hours, or overnight.
3. Run a thin knife around the edge of each ramekin, place a plate on top and flip in one confident motion.

The caramel will flow down the sides as a sauce. Serve cold.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Holes or bubbles in the custard | Oven too hot or no water bath | Lower the temperature and keep the water level halfway up |
| Pudding will not release from the ramekin | Not chilled long enough | Chill for at least 4 hours, then warm the base briefly in hot water |
| Bitter caramel | Cooked past deep amber | Start again and take the pan off the heat a little earlier |
| Watery layer at the bottom | Overbaked and curdled | Reduce baking time and check for a slight wobble |

## Next steps

- Swap vanilla for a pandan leaf steeped in the warm milk.
- Make a single large mould and bake for 10 to 15 minutes longer.
- Scale the recipe: multiply every quantity by the same factor and keep the ramekin size consistent.
