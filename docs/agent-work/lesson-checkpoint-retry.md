# Lesson Checkpoint Retry

Project ID: `kostudy`
Status: `verification`
Temperature: `hot`
Task: `BIGRAS-70`

## Observed lesson loop

The canonical `Forgetting Is Part of Learning` lesson supplies the full loop requested by the task: explanation, an interactive forgetting-curve model, a prediction challenge, a retrieval checkpoint, corrective feedback, completion, and local progress persistence.

## Weakest learning step

The checkpoint previously stopped active retrieval after the first submitted answer. A wrong answer displayed the instruction “retrieve it again,” but disabled every option, recorded the checkpoint as complete, and enabled Continue. The learner could only read the correction and move on.

## Improvement specification

1. A wrong checkpoint answer is saved as an attempt but does not complete the block or unlock Continue.
2. Corrective feedback remains visible until the learner explicitly chooses `Try again`.
3. Retrying clears the selection, re-enables all options, and identifies the next attempt number.
4. Each submitted attempt is retained in local lesson progress; existing single-result progress remains readable.
5. A correct answer completes the checkpoint, reports the successful attempt number, and unlocks Continue.
6. Curriculum prompts, answers, explanations, and claims remain unchanged.

## Files

- `src/components/lessons/LessonBlockView.tsx` — retry interaction and attempt feedback.
- `src/screens/LessonScreen.tsx` — correct-answer progression gate.
- `src/utils/lessonProgress.ts` — attempt history and completion semantics.
- `scripts/validate-lesson-ux.mjs` — regression contracts for the retry loop.

## Verification target

- Submit an incorrect answer and confirm the correction plus `Try again` appear while Continue stays disabled.
- Retry with the correct answer and confirm the attempt count, unlocked continuation, and persisted progress after reload.

## Verification result — 2026-09-17

- `validate:lesson-ux`, `validate:learning`, and `validate:interactions` pass.
- Targeted ESLint reports no errors in the changed source and validation files (one pre-existing `LessonScreen` dependency warning remains).
- An executable state-loop check against `lessonProgress.ts` confirmed that a wrong answer leaves completion at 0%, a correct retry completes the checkpoint, and both attempts survive JSON persistence.
- Repository-wide lint remains blocked by 106 pre-existing errors outside this workstream, including generated `dev-dist`, AI, SagaLearn, and legacy files.
- Server-side visual capture is not verified: every KoStudy route returns HTTP 403 to the capture service as `authentication_required`, including `/`, while the sandbox service returns HTTP 200 and the app contains no application-auth gate. Restarting preview services did not change the result. Failed capture placeholders were removed; a human should inspect the live preview route after signing into the preview gateway.
