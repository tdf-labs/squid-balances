import { SubstrateNetwork } from '../model';
import {
  TreasuryAwardedEvent as KhalaTreasuryAwardedEvent,
  TreasuryDepositEvent as KhalaTreasuryDepositEvent,
} from '../types/khala/events';
import {
  TreasuryAwardedEvent as KusamaTreasuryAwardedEvent,
  TreasuryDepositEvent as KusamaTreasuryDepositEvent,
} from '../types/kusama/events';
import { ChainContext, Event } from '../types/kusama/support';
import {
  TreasuryAwardedEvent as LitentryTreasuryAwardedEvent,
  TreasuryDepositEvent as LitentryTreasuryDepositEvent,
} from '../types/litentry/events';
import {
  TreasuryAwardedEvent as LitmusTreasuryAwardedEvent,
  TreasuryDepositEvent as LitmusTreasuryDepositEvent,
} from '../types/litmus/events';
import {
  TreasuryAwardedEvent as PolkadotTreasuryAwardedEvent,
  TreasuryDepositEvent as PolkadotTreasuryDepositEvent,
} from '../types/polkadot/events';

export function getTreasuryAwardedEvent(
  ctx: ChainContext,
  event: Event,
  network: SubstrateNetwork
): {
  award: bigint;
  account: Uint8Array;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const data = new KusamaTreasuryAwardedEvent(ctx, event);

      if (data.isV1020) {
        const [, award, account] = data.asV1020;
        return {
          award,
          account,
        };
      }

      if (data.isV9160) {
        return data.asV9160;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const data = new PolkadotTreasuryAwardedEvent(ctx, event);

      if (data.isV0) {
        const [, award, account] = data.asV0;
        return {
          award,
          account,
        };
      }

      if (data.isV9170) {
        return data.asV9170;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.khala: {
      const data = new KhalaTreasuryAwardedEvent(ctx, event);

      if (data.isV1) {
        const [, award, account] = data.asV1;
        return {
          award,
          account,
        };
      }
      if (data.isV1110) {
        return data.asV1110;
      }
    }

    case SubstrateNetwork.litmus: {
      const data = new LitmusTreasuryAwardedEvent(ctx, event);

      if (data.isV9020) {
        const [, award, account] = data.asV9020;
        return {
          award,
          account,
        };
      }

      if (data.isV9031) {
        return data.asV9031;
      }
    }

    case SubstrateNetwork.litentry: {
      const data = new LitentryTreasuryAwardedEvent(ctx, event);

      if (data.isV9000) {
        const [, award, account] = data.asV9000;
        return {
          award,
          account,
        };
      }

      if (data.isV9071) {
        return data.asV9071;
      }
    }

    default: {
      throw new Error('getTreasuryAwardedEvent::network not supported');
    }
  }
}

export function getTreasuryDepositEvent(
  ctx: ChainContext,
  event: Event,
  network: SubstrateNetwork
): {
  amount: bigint;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const data = new KusamaTreasuryDepositEvent(ctx, event);

      if (data.isV1020) {
        return {
          amount: data.asV1020,
        };
      }

      if (data.isV9160) {
        return {
          amount: data.asV9160.value,
        };
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const data = new PolkadotTreasuryDepositEvent(ctx, event);

      if (data.isV0) {
        return {
          amount: data.asV0,
        };
      }

      if (data.isV9170) {
        return {
          amount: data.asV9170.value,
        };
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.khala: {
      const data = new KhalaTreasuryDepositEvent(ctx, event);

      if (data.isV1) {
        const amount = data.asV1;
        return {
          amount,
        };
      }

      if (data.isV1110) {
        return {
          amount: data.asV1110.value,
        };
      }
    }

    case SubstrateNetwork.litmus: {
      const data = new LitmusTreasuryDepositEvent(ctx, event);

      if (data.isV9020) {
        const amount = data.asV9020;
        return {
          amount,
        };
      }

      if (data.isV9031) {
        return {
          amount: data.asV9031.value,
        };
      }
    }

    case SubstrateNetwork.litentry: {
      const data = new LitentryTreasuryDepositEvent(ctx, event);

      if (data.isV9000) {
        const amount = data.asV9000;
        return {
          amount,
        };
      }

      if (data.isV9071) {
        return {
          amount: data.asV9071.value,
        };
      }
    }

    default: {
      throw new Error('getTreasuryDepositEvent::network not supported');
    }
  }
}
