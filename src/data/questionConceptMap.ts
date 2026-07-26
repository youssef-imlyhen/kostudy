export const questionConceptMap: Record<string, string[]> = {
  yt_tp_1: ['packaging-promise'],
  yt_tp_2: ['packaging-promise', 'audience-match'],
  yt_tp_3: ['packaging-promise'],
  yt_tp_4: ['packaging-promise', 'ctr'],
  yt_tp_5: ['packaging-promise'],
  yt_aa_1: ['ctr', 'retention-curve'],
  yt_aa_3: ['ctr'],
  yt_aa_4: ['retention-curve'],
  yt_aa_5: ['ctr', 'retention-curve', 'diagnostic-thinking'],
  yt_sh_1: ['viewer-expectation'],
};

export const getQuestionIdsForConcept = (conceptId: string): string[] => Object.entries(questionConceptMap)
  .filter(([, conceptIds]) => conceptIds.includes(conceptId))
  .map(([questionId]) => questionId);
