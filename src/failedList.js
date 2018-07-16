// 同步失败的地区列表：
/**
SELECT
	id,
	concat(
		substr(prov_name,1,2),
		CASE
	WHEN city_name IN ('市辖区', '县','省直辖县级行政区划') THEN
		''
	ELSE
		city_name
	END,
	county_name
	) locale,
	county_id
FROM
	`tbl_vote_count`
WHERE
	id < 2852
AND zip_code = 0;
 */