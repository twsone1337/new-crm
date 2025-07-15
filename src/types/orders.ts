export const statusEnum = {
  CANCELLED: 'CANCELLED',
  PAYED: 'PAYED',
  PENDING: 'PENDING',
} as const;

export type StatusEnum = (typeof statusEnum)[keyof typeof statusEnum];
