function shortenPath(p: string, maxCharCount: integer) {
  if (p.length <= maxCharCount)
    return p;

  const parts = p
    .split(/(\/|\\)/)
    .filter(s => !s.match(/(\/|\\)/) && s !== '');

  if (!parts.length)
    return p;

  const repoName = parts[0];

  const ellipsisCropEnd = s => `${s.slice(0, maxCharCount - 3)}...`

  if (repoName.length > maxCharCount)
    return ellipsisCropEnd(repoName);

  let res = repoName;
  let remainingCharCount = maxCharCount - repoName.length;

  const lastPart = parts[parts.length - 1];

  if (repoName.length + lastPart.length + 5 > maxCharCount)
    return ellipsisCropEnd(`${repoName}/.../${lastPart}`);

  res = `${res}/.../${lastPart}/`;

  let lastLeftIdx = 0;
  let lastRightIdx = parts.length - 1;

  do {
    if (lastLeftIdx === lastRightIdx)
      return res;
    
    let nextRes = res.replace('...', `${parts[++lastLeftIdx]}/...`);
    if (nextRes.length > maxCharCount)
      return res;

    if (lastLeftIdx === lastRightIdx)
      return res;
    
    res = nextRes;
    nextRes = res.replace('...', `${parts[--lastRightIdx]}/...`);
    if (nextRes.length > maxCharCount)
      return res;
    
  } while (res.length <= maxCharCount);

  return res;
}

module.exports = shortenPath;

