import { keel } from '@teamkeel/client-react';
import { APIClient } from './keelClient';

export const { KeelProvider, useKeel } = keel(APIClient);
