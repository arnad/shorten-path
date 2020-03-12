function shortenPath(p, maxCharCount) {
  if (typeof p !== 'string' || typeof maxCharCount !== 'number')
    return p;
  
  if (isNaN(parseInt(maxCharCount, 10)))
    return p;

  const mcc = parseInt(maxCharCount, 10);
  
  if (p.length <= mcc)
    return p;

  const parts = p
    .split(/(\/|\\)/)
    .filter(s => !s.match(/(\/|\\)/) && s !== '');

  if (!parts.length)
    return p;

  const repoName = parts[0];

  const ellipsisCropEnd = s => `${s.slice(0, mcc - 3)}...`

  if (repoName.length > mcc)
    return ellipsisCropEnd(repoName);

  let res = `${res}/.../${lastPart}/`;

  const lastPart = parts[parts.length - 1];

  if (repoName.length + lastPart.length + 5 > mcc)
    return ellipsisCropEnd(res);

  let lastLeftIdx = 0;
  let lastRightIdx = parts.length - 1;

  do {
    if (lastLeftIdx === lastRightIdx)
      return res;
    
    let nextRes = res.replace('...', `${parts[++lastLeftIdx]}/...`);
    if (nextRes.length > mcc)
      return res;

    if (lastLeftIdx === lastRightIdx)
      return res;
    
    res = nextRes;
    nextRes = res.replace('...', `${parts[--lastRightIdx]}/...`);
    if (nextRes.length > mcc)
      return res;
    
  } while (res.length <= mcc);

  return res;
}

module.exports = shortenPath;
