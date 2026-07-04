// ─── Midtrans Snap Client ───
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY!;
const MIDTRANS_IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === "true";

const MIDTRANS_API = MIDTRANS_IS_PRODUCTION
  ? "https://app.midtrans.com/snap/v1"
  : "https://app.sandbox.midtrans.com/snap/v1";

const AUTH_HEADER = Buffer.from(MIDTRANS_SERVER_KEY + ":").toString("base64");

export interface SnapParam {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  customer_details: {
    first_name: string;
    email?: string;
    phone?: string;
  };
  item_details: Array<{
    id: string;
    price: number;
    quantity: number;
    name: string;
  }>;
  callbacks?: {
    finish?: string;
    error?: string;
    pending?: string;
  };
}

export interface SnapResponse {
  token: string;
  redirect_url: string;
}

export async function generateSnapToken(
  params: SnapParam
): Promise<SnapResponse> {
  const res = await fetch(`${MIDTRANS_API}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${AUTH_HEADER}`,
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Midtrans error: ${res.status} — ${err}`);
  }

  return res.json();
}

export function generateOrderId(prefix: string = "WDC"): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${ts}-${rand}`;
}
