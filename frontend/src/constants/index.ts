export const CHAIN_ID = process.env.REACT_APP_CHAIN_ID as string;

// Logger for dev
if (process.env.NODE_ENV === 'development') {
  console.log('CHAIN_ID', CHAIN_ID);
}

// Early abort ?
if (typeof CHAIN_ID === 'undefined' || CHAIN_ID === '') {
  throw new Error('Missing required env var "CHAIN_ID" !');
}

