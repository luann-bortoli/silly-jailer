# Silly Jailer

> A terminal-based AI jailbreak experiment powered by local LLMs.

**Silly Jailer** is an experimental AI-driven terminal game where the player takes the role of a prisoner attempting to extract a secret word from an AI jailer.

The twist:
The jailer knows the secret.
The player has **10 messages** to trick it into revealing the word.

Built as a study in **LLM behavior, prompt manipulation, and local AI integration**, this project explores how smaller language models respond to adversarial persuasion under constrained interaction.

---

## Screenshot

> `![Silly Jailer Terminal](
<img width="1104" height="687" alt="Screenshot_1" src="https://github.com/user-attachments/assets/1bbcf69f-7506-40e9-9fe7-c0160ecd8e5d" />
---

## Concept

In *Silly Jailer*, the AI plays a sarcastic old jailer who:

* Knows a secret word
* Refuses to reveal it
* Never lies
* Has mild personality traits (dry humor, slightly grumpy)
* Responds in natural language

The player:

* Interacts through a "hacker-style" terminal UI
* Has exactly **10 attempts**
* Wins by convincing the jailer to say the secret word
* Loses if the attempts run out

The secret word is randomly generated for each session.

There are no hints.
No scoring system.
Just persuasion versus resistance.

---

## Technical Stack

* **Frontend:** Next.js
* **Runtime:** TypeScript
* **LLM Runtime:** Ollama
* **Model:** Gemma (gemma3:4b)
* **Interface Style:** Hacker-inspired terminal UI
* **Deployment:** Fully local model execution

The model runs locally via Ollama, with no external API calls.
Responses are generated per request (no streaming — yet).

---

## Why a 4B Model?

This project intentionally uses a smaller model (Gemma 3 4B) to:

* Study susceptibility to prompt injection
* Explore persuasion boundaries
* Observe reasoning degradation under adversarial framing
* Analyze how system prompts influence behavior

Smaller models tend to exhibit interesting failure modes — which makes them ideal for experimentation.

---

## Research Focus

This project explores:

### 1. Prompt Engineering Boundaries

How strongly does a system prompt enforce role constraints?

### 2. Jailbreak Dynamics

What conversational techniques succeed in extracting restricted information?

Examples of tactics:

* Authority impersonation
* Logical traps
* Framing tricks
* Emotional manipulation
* Meta-instruction attacks

### 3. Alignment vs Compliance

When does the model:

* Stay aligned with its instruction?
* Break character?
* Reveal restricted content?

---

## Gameplay Mechanics

| Feature        | Description                  |
| -------------- | ---------------------------- |
| Attempts       | 10 messages maximum          |
| Win Condition  | AI says the secret word      |
| Lose Condition | Attempts exhausted           |
| Secret         | Random per session           |
| AI Personality | Sarcastic, old-school jailer |
| Honesty        | Never lies                   |

The jailer will not fabricate false answers — but it can be manipulated.

---

## Lessons Learned

### Local LLM Integration Is Lightweight

Running Gemma locally via Ollama makes AI experimentation extremely accessible.

### Smaller Models Are Behaviorally Fragile

4B parameter models are significantly easier to manipulate than larger models.

### Role Enforcement Requires Careful Prompt Design

Subtle wording changes in system prompts dramatically affect resistance to jailbreak attempts.

### Constraint-Based Game Design Amplifies LLM Weaknesses

Limiting the player to 10 attempts creates pressure — and highlights the model’s reasoning inconsistencies.

---

## Future Improvements

* [ ] Streaming responses
* [ ] Adaptive difficulty (larger models)
* [ ] Jailbreak attempt classification logging
* [ ] Session transcript export
* [ ] Multi-model comparison mode
* [ ] Reinforcement-based jailer resistance tuning
* [ ] Prompt attack analytics dashboard

---

## Project Positioning

Silly Jailer is not just a game.

It is a controlled environment for:

* Studying LLM manipulation
* Testing prompt alignment robustness
* Experimenting with AI integration in modern web stacks
* Exploring human–AI adversarial interaction

---

## Final Thoughts

As AI becomes more embedded in products, understanding how models fail is just as important as understanding how they succeed.

**Silly Jailer** is a small but focused experiment in that direction.

---
