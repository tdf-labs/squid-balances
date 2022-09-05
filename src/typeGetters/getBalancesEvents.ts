import { SubstrateNetwork } from '../model';
import {
  BalancesBalanceSetEvent as KusamaBalancesBalanceSetEvent,
  BalancesDepositEvent as KusamaBalancesDepositEvent,
  BalancesEndowedEvent as KusamaBalancesEndowedEvent,
  BalancesTransferEvent as KusamaBalancesTransferEvent,
} from '../types/kusama/events';
// it feels a bit wrong using kusama types on all the getters but ChainContext and Event are generic
import {
  BalancesBalanceSetEvent as KhalaBalancesBalanceSetEvent,
  BalancesDepositEvent as KhalaBalancesDepositEvent,
  BalancesEndowedEvent as KhalaBalancesEndowedEvent,
  BalancesTransferEvent as KhalaBalancesTransferEvent,
} from '../types/khala/events';
import { ChainContext, Event } from '../types/kusama/support';
import {
  BalancesBalanceSetEvent as LitentryBalancesBalanceSetEvent,
  BalancesDepositEvent as LitentryBalancesDepositEvent,
  BalancesEndowedEvent as LitentryBalancesEndowedEvent,
  BalancesTransferEvent as LitentryBalancesTransferEvent,
} from '../types/litentry/events';
import {
  BalancesBalanceSetEvent as LitmusBalancesBalanceSetEvent,
  BalancesDepositEvent as LitmusBalancesDepositEvent,
  BalancesEndowedEvent as LitmusBalancesEndowedEvent,
  BalancesTransferEvent as LitmusBalancesTransferEvent,
} from '../types/litmus/events';
import {
  BalancesBalanceSetEvent as PolkadotBalancesBalanceSetEvent,
  BalancesDepositEvent as PolkadotBalancesDepositEvent,
  BalancesEndowedEvent as PolkadotBalancesEndowedEvent,
  BalancesTransferEvent as PolkadotBalancesTransferEvent,
} from '../types/polkadot/events';

export function getBalancesBalanceSetEvent(
  ctx: ChainContext,
  event: Event,
  network: SubstrateNetwork
): {
  who: Uint8Array;
  free: bigint;
  reserved: bigint;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const data = new KusamaBalancesBalanceSetEvent(ctx, event);
      if (data.isV1031) {
        const [who, free, reserved] = data.asV1031;
        return { who, free, reserved };
      }

      if (data.isV9130) {
        return data.asV9130;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const data = new PolkadotBalancesBalanceSetEvent(ctx, event);
      if (data.isV0) {
        const [who, free, reserved] = data.asV0;
        return { who, free, reserved };
      }

      if (data.isV9140) {
        return data.asV9140;
      }

      throw new Error('Unexpected version');
    }
    case SubstrateNetwork.khala: {
      const data = new KhalaBalancesBalanceSetEvent(ctx, event);

      if (data.isV1) {
        const [who, free, reserved] = data.asV1;
        return { who, free, reserved };
      }
      if (data.isV1090) {
        return data.asV1090;
      }
    }

    case SubstrateNetwork.litentry: {
      const data = new LitentryBalancesBalanceSetEvent(ctx, event);
      if (data.isV9000) {
        const [who, free, reserved] = data.asV9000;
        return { who, free, reserved };
      }

      if (data.isV9071) {
        return data.asV9071;
      }
    }

    case SubstrateNetwork.litmus: {
      const data = new LitmusBalancesBalanceSetEvent(ctx, event);
      if (data.isV9020) {
        return data.asV9020;
      }
    }

    default: {
      throw new Error('getBalancesBalanceSetEvent::network not supported');
    }
  }
}

export function getBalancesDepositEvent(
  ctx: ChainContext,
  event: Event,
  network: SubstrateNetwork
): {
  who: Uint8Array;
  amount: bigint;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const data = new KusamaBalancesDepositEvent(ctx, event);

      if (data.isV1032) {
        const [who, amount] = data.asV1032;
        return { who, amount };
      }

      if (data.isV9130) {
        return data.asV9130;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const data = new PolkadotBalancesDepositEvent(ctx, event);

      if (data.isV0) {
        const [who, amount] = data.asV0;
        return { who, amount };
      }

      if (data.isV9140) {
        return data.asV9140;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.khala: {
      const data = new KhalaBalancesDepositEvent(ctx, event);

      if (data.isV1) {
        const [who, amount] = data.asV1;
        return { who, amount };
      }
      if (data.isV1090) {
        return data.asV1090;
      }
    }

    case SubstrateNetwork.litmus: {
      const data = new LitmusBalancesDepositEvent(ctx, event);

      if (data.isV9020) {
        return data.asV9020;
      }
    }

    case SubstrateNetwork.litentry: {
      const data = new LitentryBalancesDepositEvent(ctx, event);
      if (data.isV9000) {
        const [who, amount] = data.asV9000;
        return { who, amount };
      }

      if (data.isV9071) {
        return data.asV9071;
      }
    }

    default: {
      throw new Error('getBalancesDepositEvent::network not supported');
    }
  }
}

export function getBalancesEndowedEvent(
  ctx: ChainContext,
  event: Event,
  network: SubstrateNetwork
): {
  account: Uint8Array;
  freeBalance: bigint;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const data = new KusamaBalancesEndowedEvent(ctx, event);

      if (data.isV1050) {
        const [account, freeBalance] = data.asV1050;
        return { account, freeBalance };
      }

      if (data.isV9130) {
        return data.asV9130;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const data = new PolkadotBalancesEndowedEvent(ctx, event);

      if (data.isV0) {
        const [account, freeBalance] = data.asV0;
        return { account, freeBalance };
      }

      if (data.isV9140) {
        return data.asV9140;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.khala: {
      const data = new KhalaBalancesEndowedEvent(ctx, event);

      if (data.isV1) {
        const [account, freeBalance] = data.asV1;
        return { account, freeBalance };
      }
      if (data.isV1090) {
        return data.asV1090;
      }
    }

    case SubstrateNetwork.litentry: {
      const data = new LitentryBalancesEndowedEvent(ctx, event);
      if (data.isV9000) {
        const [account, freeBalance] = data.asV9000;
        return { account, freeBalance };
      }

      if (data.isV9071) {
        return data.asV9071;
      }
    }

    case SubstrateNetwork.litmus: {
      const data = new LitmusBalancesEndowedEvent(ctx, event);

      if (data.isV9020) {
        return data.asV9020;
      }
    }

    default: {
      throw new Error('getBalancesEndowedEvent::network not supported');
    }
  }
}

export function getBalancesTransferEvent(
  ctx: ChainContext,
  event: Event,
  network: SubstrateNetwork
): {
  from: Uint8Array;
  to: Uint8Array;
  amount: bigint;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const data = new KusamaBalancesTransferEvent(ctx, event);

      if (data.isV1020) {
        const [from, to, amount] = data.asV1020;
        return { from, to, amount };
      }

      if (data.isV1050) {
        const [from, to, amount] = data.asV1050;
        return { from, to, amount };
      }

      if (data.isV9130) {
        return data.asV9130;
      }
      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const data = new PolkadotBalancesTransferEvent(ctx, event);

      if (data.isV0) {
        const [from, to, amount] = data.asV0;
        return { from, to, amount };
      }
      if (data.isV9140) {
        return data.asV9140;
      }
      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.khala: {
      const data = new KhalaBalancesTransferEvent(ctx, event);

      if (data.isV1) {
        const [from, to, amount] = data.asV1;
        return { from, to, amount };
      }
      if (data.isV1090) {
        return data.asV1090;
      }
    }

    case SubstrateNetwork.litentry: {
      const data = new LitentryBalancesTransferEvent(ctx, event);
      if (data.isV9000) {
        const [from, to, amount] = data.asV9000;
        return { from, to, amount };
      }

      if (data.isV9071) {
        return data.asV9071;
      }
    }

    case SubstrateNetwork.litmus: {
      const data = new LitmusBalancesTransferEvent(ctx, event);

      if (data.isV9020) {
        return data.asV9020;
      }
    }

    default: {
      throw new Error('getBalancesTransferEvent::network not supported');
    }
  }
}
