export const length = {
  /* RFC std is, 
  max 64 chars for local address + 
  255 chars for complete domain, as in:
  local.address@complete.domain */
  email: {
    min: 6, // i.e.: 'a@b.ca'
    max: 255, // Longest email add is 320 and it is silly.
  },
  suffix: 9, // max roman numerals: MMMCMXCIX = 3999
  name: {
    min: 1, // there is a chinese/korean last name: 'O', or 'E'. very likely the same case with first name
    max: 255, // 30 is generous, but we're giving room for edge cases
  },
  username: {
    min: 6, // google's enforced minimum length, although its use case (big users pool) very likely won't apply to app with small users pool
  },
  password: {
    min: 8, // common standard
  },
  max: 255, // in bytes which roughly equals to 255 chars without a good text compression algorithm.
};
