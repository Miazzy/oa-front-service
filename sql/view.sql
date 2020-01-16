
CREATE OR REPLACE VIEW `v_depart_name` AS select `t2`.`org_code` AS `org_code`,`t2`.`id` AS `id`,concat(ifnull(`t2`.`depart_name`,''),' - ',ifnull(`t1`.`depart_name`,'')) AS `name` from (`sys_depart` `t2` left join `sys_depart` `t1` on((`t1`.`id` = `t2`.`parent_id`))) ;

CREATE OR REPLACE VIEW `v_handled_events` AS select `h`.`business_data_id` AS `id`,`h`.`id` AS `pid`,(case when (`h`.`action` = '知会') then '知会' else '审批' end) AS `type`,`h`.`table_name` AS `tname`,`c`.`table_txt` AS `name`,`h`.`content` AS `topic`,`h`.`employee` AS `username`,`h`.`create_time` AS `create_time` from (`PR_LOG_HISTORY` `h` left join `onl_cgform_head` `c` on((`h`.`table_name` = convert(`c`.`table_name` using utf8mb4)))) ;

CREATE OR REPLACE VIEW `v_handling_events` AS select `h`.`id` AS `id`,`h`.`pid` AS `pid`,`h`.`type` AS `type`,`h`.`name` AS `tname`,`c`.`table_txt` AS `name`,`h`.`topic` AS `topic`,`h`.`username` AS `username`,`h`.`user` AS `user`,`h`.`create_time` AS `create_time` from (((select `jeecg`.`PR_LOG`.`business_data_id` AS `id`,`jeecg`.`PR_LOG`.`id` AS `pid`,'审批' AS `type`,`jeecg`.`PR_LOG`.`table_name` AS `name`,`jeecg`.`PR_LOG`.`content` AS `topic`,replace(`jeecg`.`PR_LOG`.`employee`,ifnull(`jeecg`.`PR_LOG`.`approve_user`,''),'') AS `username`,ifnull(`jeecg`.`PR_LOG`.`approve_user`,'') AS `user`,`jeecg`.`PR_LOG`.`create_time` AS `create_time` from `jeecg`.`PR_LOG`) union all select `jeecg`.`PR_LOG_INFORMED`.`business_data_id` AS `id`,`jeecg`.`PR_LOG_INFORMED`.`id` AS `pid`,'知会' AS `type`,`jeecg`.`PR_LOG_INFORMED`.`table_name` AS `name`,`jeecg`.`PR_LOG_INFORMED`.`content` AS `topic`,replace(`jeecg`.`PR_LOG_INFORMED`.`employee`,ifnull(`jeecg`.`PR_LOG_INFORMED`.`approve_user`,''),'') AS `username`,ifnull(`jeecg`.`PR_LOG_INFORMED`.`approve_user`,'') AS `user`,`jeecg`.`PR_LOG_INFORMED`.`create_time` AS `create_time` from `jeecg`.`PR_LOG_INFORMED`) `h` left join `jeecg`.`onl_cgform_head` `c` on((`h`.`name` = convert(`c`.`table_name` using utf8mb4)))) ;

CREATE OR REPLACE VIEW `v_table_field` AS (select `f`.`db_field_name` AS `field`,`f`.`db_field_txt` AS `txt`,`h`.`table_name` AS `name` from (`onl_cgform_field` `f` left join `onl_cgform_head` `h` on((`f`.`cgform_head_id` = `h`.`id`)))) ;

CREATE OR REPLACE VIEW `v_table_info` AS select `v_table_field`.`name` AS `id`,concat('{',group_concat(concat('"',`v_table_field`.`field`,'":"',`v_table_field`.`txt`,'"') separator ','),'}') AS `value` from `v_table_field` where (`v_table_field`.`name` is not null) group by `v_table_field`.`name` ;

CREATE OR REPLACE VIEW `v_table_name` AS select `onl_cgform_head`.`table_name` AS `id`,`onl_cgform_head`.`table_txt` AS `name` from `onl_cgform_head` ;

CREATE OR REPLACE VIEW `v_user` AS select `u`.`username` AS `username`,`u`.`realname` AS `realname`,`u`.`post` AS `post`,`u`.`address` AS `address`,`u`.`bio` AS `bio`,`u`.`tags` AS `tags`,`u`.`nickname` AS `nickname`,ifnull(`u`.`email`,'') AS `email`,ifnull(`u`.`phone`,'') AS `phone`,ifnull(`d`.`name`,'') AS `name` from (`sys_user` `u` left join `v_depart_name` `d` on((`u`.`org_code` = `d`.`org_code`))) ;

CREATE OR REPLACE VIEW `v_visit_month` AS select count(`t`.`id`) AS `total`,`t`.`date` AS `date` from (select `jeecg`.`sys_log`.`id` AS `id`,date_format(`jeecg`.`sys_log`.`create_time`,'%Y-%m-%d') AS `date` from `jeecg`.`sys_log` where ((to_days(`jeecg`.`sys_log`.`create_time`) - to_days(now())) >= -(30))) `t` group by `t`.`date` ;

CREATE OR REPLACE VIEW `v_visit_total` AS select `t`.`ctotal` AS `ctotal`,`m`.`vtotal` AS `vtotal` from ((select count(0) AS `ctotal` from `jeecg`.`sys_log` where ((to_days(`jeecg`.`sys_log`.`create_time`) - to_days(now())) = 0)) `t` join (select count(0) AS `vtotal` from `jeecg`.`sys_log`) `m`);

CREATE OR REPLACE VIEW `v_uname` AS SELECT username , realname FROM jeecg.v_user;

CREATE OR REPLACE VIEW `V_SLINK` AS SELECT id , url FROM jeecg.bs_short_link;

