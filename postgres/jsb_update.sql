CREATE OR REPLACE FUNCTION dup_field()
RETURNS void AS $$
declare rec entities%rowtype;
BEGIN
  for rec in select * from entities where type = 'study-metadata' and data->>'tumor_origin' IS NOT NULL  loop
    update entities set data = jsonb_set(rec.data, '{tumour_origin}', rec.data->'tumor_origin') where id = rec.id;
  end loop;
END;
$$ LANGUAGE plpgsql;
