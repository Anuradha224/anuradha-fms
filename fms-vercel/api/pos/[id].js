import { getSupabase, cors, ok, err } from '../_lib.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  const sb = getSupabase();
  const { id } = req.query;
  if (!id) return err(res, 'Missing id', 400);

  if (req.method === 'PATCH') {
    const body = req.body;
    const update = {};
    if (body.poNo         !== undefined) update.po_no         = body.poNo;
    if (body.vendor       !== undefined) update.vendor        = body.vendor;
    if (body.totalQty     !== undefined) update.total_qty     = body.totalQty;
    if (body.leadDays     !== undefined) update.lead_days     = body.leadDays;
    if (body.status       !== undefined) update.status        = body.status;
    if (body.planned      !== undefined) update.planned       = body.planned;
    if (body.steps        !== undefined) update.steps         = body.steps;
    if (body.receivings   !== undefined) update.receivings    = body.receivings;
    if (body.cancelledQty !== undefined) update.cancelled_qty = body.cancelledQty;
    if (body.cancelRemark !== undefined) update.cancel_remark = body.cancelRemark;

    const { data, error } = await sb.from('pos').update(update).eq('id', id).select().single();
    if (error) return err(res, error.message);
    return ok(res, data);
  }

  if (req.method === 'DELETE') {
    const { error } = await sb.from('pos').delete().eq('id', id);
    if (error) return err(res, error.message);
    return ok(res, { ok: true });
  }

  return err(res, 'Method not allowed', 405);
}
