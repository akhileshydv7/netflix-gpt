import OpenAI from 'openai';
import { GPT_OPENAI_KEY } from './Constants';

const openai = new OpenAI({
    // apiKey: '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',
    apiKey: GPT_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
});

export default openai;