
<map>
  <node ID="root" TEXT="/zj_humanoid">
    <node TEXT="/robot" ID="a12104644435cfc87b5a026845123ddc" STYLE="bubble" POSITION="right">
      <node TEXT="/robot_state" ID="440cdf2efa0cb52fa73b47735d8f6c5a" STYLE="fork">
        <node TEXT="description" ID="be0cf39774f9c4b69cc7426144dea745" STYLE="fork">
          <node TEXT="机器人状态机值实时发布，只有当机器人进入RUN状态，机器人才能进行动作的执行" ID="258a52eed8ac176d0c354dcdd762c1ad" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="5ae2d73b7d674783e57e106a66c89cd6" STYLE="fork">
          <node TEXT="Topic/Publish" ID="615bbd079798ca922f3604c5e28b441e" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="e6f7e21dc273e86c91b2d8d0ecf5749d" STYLE="fork">
          <node TEXT="RobotState" ID="86debb72c395d4a50d0dd418f0343f59" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="f43c5557d5fd700c96dcf3c4d0f8d0d0" STYLE="fork">
          <node TEXT="1" ID="e21d6471c25fb4271d411abdc32f6d73" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="3e244cc0f2b3bbae66e99dc87a148701" STYLE="fork">
          <node TEXT="run_state" ID="5d5b6758c82ef1a326de6af71413f22d" STYLE="fork">
            <node TEXT="" ID="616082f116a6969eeac617a43d6b21ed" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="agent" ID="ef4bbeaee1b9b94cd1bc5c0ef385e9aa" STYLE="fork">
          <node TEXT="机器人当前处于什么状态" ID="3ac26bdded59ff06c15e62151bbf2d21" STYLE="fork">
            <node TEXT="回复应包含：RUN状态" ID="724ed7862dcb2fea260edd564781739b" STYLE="fork"/>
          </node>
        </node>
      </node>
      <node TEXT="/set_robot_state" ID="15c38720ba89864ff278610f2aef54c2" STYLE="fork">
        <node TEXT="/stop" ID="779774f0d94d6522a7f2e3f8c02a404d" STYLE="fork">
          <node TEXT="description" ID="42a7ab828fa687169cd3e71e55b96f9b" STYLE="fork">
            <node TEXT="机器人软急停状态，状态机值将切换为ERR，在机器发生异常时使用" ID="82ddf42eba4b4a569346395c503f3575" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="e01b198705d7adf9adff32c9e4c7c396" STYLE="fork">
            <node TEXT="Service" ID="6489acd1827e3a0881727e1b56833f4a" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="345ce82035926c32a9ebba7e6b51908f" STYLE="fork">
            <node TEXT="std_srvs/Trigger" ID="73d7072a9814f9e0c1e8f5d327ec13dd" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="ee1541a3926aaff1148aec79ed69354e" STYLE="fork">
            <node TEXT="stop_robot" ID="2fdad30410d3960ac3f728d914e8f806" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="9416f14721bd07c6c40d3066f7de0599" STYLE="fork">
            <node TEXT="将机器人状态设置为stop" ID="9515075e5284ef253449056fcca4f242" STYLE="fork">
              <node TEXT="1秒后，检测robot_state话题，状态应切换为：ERR" ID="cb57df2168c565e61e0be66050c7afe5" STYLE="fork"/>
            </node>
          </node>
        </node>
        <node TEXT="/run" ID="5cc09293b1d3b733e74d86b1a3f99dd1" STYLE="fork">
          <node TEXT="description" ID="9929806f860bfbfd07024da21bb14361" STYLE="fork">
            <node TEXT="如果机器人处于非RUN状态，尝试将机器人状态值设置为RUN，但如果有异常的存在，也可能会失败" ID="3a00c0a45d26b6bb103de7b8f2e3691d" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="767c39fd22a5c28fded280fbe21194e3" STYLE="fork">
            <node TEXT="Service" ID="99e000e1882ed51bb78135b3119bf5ec" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="89550b6311d52aaf86ae5c585210e618" STYLE="fork">
            <node TEXT="std_srvs/Trigger" ID="8a1dd54ef55214f123c5cd9acacccbab" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="d55c563b1b84eedc1557ad16bf3de401" STYLE="fork">
            <node TEXT="start_robot" ID="7ce3348483aae4a587dbd1e05488b894" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="93311d38d61187cf21ad6bd88200ce94" STYLE="fork">
            <node TEXT="将机器人状态设置为RUN" ID="786bda33e35173fdb6396f48ae250a58" STYLE="fork">
              <node TEXT="持续检测robot_state话题，经过最长60秒钟的等待，状态应切换为：RUN" ID="b705a50cf799c3a4f376b569d7ae7d70" STYLE="fork"/>
            </node>
          </node>
        </node>
        <node TEXT="/restart" ID="de06bef79929d1f652763aefc8eb9c8d" STYLE="fork">
          <node TEXT="description" ID="4e5dba189cef5ab7e3bc73738eae860b" STYLE="fork">
            <node TEXT="机器人先进stop软急停状态，再自动变为RUN启动运行，在某些故障状态可以执行，但如果有异常的存在，也可能会失败" ID="102f4ea41fe5c725786f6c5bf6452a0f" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="26259b0368d8d2f9d6fb113c6d0f0739" STYLE="fork">
            <node TEXT="Service" ID="687b7fe80cd4710fff8d5d7f81031a56" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="cc6acd672bbe66cb02db20e030cf650f" STYLE="fork">
            <node TEXT="std_srvs/Trigger" ID="b0635c660e33fa33ed4ffad7adf9f49c" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="c992049d46b3cb0a0db3276898e0956c" STYLE="fork">
            <node TEXT="restart_robot" ID="2b23cc1da91d00f068b24c27903e4e12" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="6d65eb8e8fc41ae18df51ac574543699" STYLE="fork">
            <node TEXT="将机器人状态机重启" ID="996bda21b6ae76da6fdce532d90b775b" STYLE="fork">
              <node TEXT="持续检测robot_state话题，经过最长60秒钟的等待，状态应切换为：RUN" ID="1274ba80c53ab31203f1961ce8e04c7c" STYLE="fork"/>
            </node>
          </node>
        </node>
        <node TEXT="/OFF" ID="32ab64a4ce027babaa36da576c2f64e2" STYLE="fork">
          <node TEXT="description" ID="7d1eb02175783edace620491cc9055bf" STYLE="fork">
            <node TEXT="机器人关机，大小脑将同步关机" ID="9ccefbaf6c1a07fbd0add69e380213be" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="17940e4c9b74fa3c85f531a340016a47" STYLE="fork">
            <node TEXT="Service" ID="eb4f469979807491463f41e5fea96bad" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="6f94b81e7c1a4b5fb6cd47ca974f1294" STYLE="fork">
            <node TEXT="std_srvs/Trigger" ID="668ce2721f8158899a19a3a4a02b698e" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="c8f7d463627ebe2031108eaaa3d4d051" STYLE="fork">
            <node TEXT="close_robot" ID="19b128987f02fc02f80381f4aa6c3018" STYLE="fork">
              <node TEXT="" ID="322d8fcea0f432db73ffbff522dccec4" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="agent" ID="2c53a40f658a2453cfed7a87053a9e4a" STYLE="fork">
            <node TEXT="将机器人关机" ID="861b58680cb983287a6fb86e62997019" STYLE="fork">
              <node TEXT="3秒后，大小脑关机，之后后没法检测到机器人建立ros链接" ID="1d59758a9ab90db4002688b5cd4db86e" STYLE="fork"/>
            </node>
          </node>
        </node>
      </node>
      <node TEXT="/basic_info" ID="1da6fd8719351b38c0d808e0f77318e2" STYLE="fork">
        <node TEXT="description" ID="9e7e5380b00b75c7313cc1d53fd847f0" STYLE="fork">
          <node TEXT="机器人基础信息，机器人的型号，硬件版本号，软件版本号，IP地址等" ID="ff99fe97f221898fbee5652d1f22bbf0" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="3a51f57a905a84660214d66fcb58e5e5" STYLE="fork">
          <node TEXT="Service" ID="87ac7055673726ad24c93ba49222ec34" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="492fb3480653d6bbb6814fc59a4c5c68" STYLE="fork">
          <node TEXT="BasicInfo" ID="659b2b4d25dda663a6f84c663ef375f9" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="b7748f8a69db6fb923f90d4d4f89a612" STYLE="fork">
          <node TEXT="I2_info" ID="eade3e81694a9bf43550d967a5ade560" STYLE="fork"/>
          <node TEXT="WA2_info" ID="9dacf74a2dc8c2f61aebc38a2784b19f" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="2ca6e9301b910220df36ed716163cc66" STYLE="fork">
          <node TEXT="描述下机器人的基础信息" ID="fbc697a1eb5b0ec00e54acf4b9023084" STYLE="fork">
            <node TEXT="回复应包含机器人的型号，硬件版本号，软件版本号，IP地址" ID="ba4cb5a9c7a3ce19ffb1b99d68713c97" STYLE="fork"/>
          </node>
        </node>
      </node>
      <node TEXT="/battery_info" ID="0c12d4d12e9732ffac7e5280d3031eb5" STYLE="fork">
        <node TEXT="description" ID="b7848878c8e1994ab480ef73599d41a3" STYLE="fork">
          <node TEXT="机器人主电池和BMS相关信息" ID="377a3b0004e398fb9ab809b24c25809f" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="b3b720d5aa9f8959e9c7f43cd548a53c" STYLE="fork">
          <node TEXT="Topic/Publish" ID="adafc12c9faafe9ad0e10e24dc162020" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="b75089cc5685bbdbda32215715080f90" STYLE="fork">
          <node TEXT="BatteryInfo" ID="3186208694ab996dbaa0aa5057d3a543" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="0bdaa2036fa7fd9ffde840de525d4eb5" STYLE="fork">
          <node TEXT="1" ID="cf888fbd27d737d929d9abebee89326e" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="69ec3d04971ed4187bdbb116015b0fc5" STYLE="fork">
          <node TEXT="机器人当前电量还剩多少" ID="9e53c02588f14bba4cc3263ecd9c6942" STYLE="fork">
            <node TEXT="回复值应为1~100%" ID="109179923b56a656504d49aebbb7d99a" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="demos" ID="cd082023fb050c8dea22e1be0a8b438b" STYLE="fork">
          <node TEXT="battery_info" ID="97effb0f2fef7010a759b7b1f299109c" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/orin_states" ID="7f0fbb8371d298f0a4ccd5ec0c1aee8b" STYLE="fork">
        <node TEXT="/errors" ID="86b1f13505534bbde01395363e5f9458" STYLE="fork">
          <node TEXT="description" ID="46afdcef1f5074af45b2f6c3c39d4639" STYLE="fork">
            <node TEXT="机器人大脑orin错误汇总，包括over_temp,over_cpu,over_mem,over_disk等" ID="4e2b157abc2e18684ad476aaa081034f" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="2682812a75440fd640ad5877cb4abc12" STYLE="fork">
            <node TEXT="Topic/Publish" ID="71848a87cfb236accd39d6c0f34d6ddd" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="c4547db1890dbf41ada67522b24cf1da" STYLE="fork">
            <node TEXT="" ID="fdacc5f446720dc1e3a30d7644ef788f" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="105fd45a434f555355f3cf0dab29de43" STYLE="fork">
            <node TEXT="1" ID="2f1bfdee6707049586d07ad7d5657bf3" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="3a2a0af6cde7aede56e68aba598e8f9f" STYLE="fork">
            <node TEXT="机器人大脑模块是否有错误发生" ID="fa344103091ced3ad56a1f8ad927267f" STYLE="fork">
              <node TEXT="回复应包含：没有" ID="137c8b97c05851d62f971894ec501fef" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="demos" ID="38a8f545b283627252c01d706f6cb510" STYLE="fork">
            <node TEXT="over_temp_err" ID="d39437973936ed9a746802693fc6a7b8" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/resource" ID="ebc35cd5be05847f177e86d4c4efdecb" STYLE="fork">
          <node TEXT="description" ID="f4f941c138c84ad5fa1c047965225224" STYLE="fork">
            <node TEXT="机器人大脑orin资源统计，包括cpu,temperature,memory,disk等信息" ID="bca48cac1ffcb9e8f97585b25228745a" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="943cfccd4faa7454a5c6be8a490ecf3b" STYLE="fork">
            <node TEXT="Topic/Publish" ID="f160e45b7f1d7479b760f391a6d0ba4f" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="0bdb9f4668eeb85b1ece0ba4f858d247" STYLE="fork">
            <node TEXT="" ID="fa775fa773b787aac1a6465e1cf4feae" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="24d27d442f900c65b13a61d68edbee1a" STYLE="fork">
            <node TEXT="1" ID="3198214a030353d0b350a12cfe1a832c" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="0a080f66b9c80156633946c62e09236c" STYLE="fork">
            <node TEXT="机器人大脑的资源状态" ID="0026b83aafe7548cfe0f9ac01426607a" STYLE="fork">
              <node TEXT="回复应包含：大脑的cpu,温度，内存，硬盘的用量" ID="e7782c0b54f7faacc0024b9977acf059" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="demos" ID="388c0b2c893919bef5fe9c1cb1369f3e" STYLE="fork">
            <node TEXT="get_orin_resouce" ID="0cf96632bfc73c25f0181ed3065fb237" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/wifi_list" ID="9b114a75a7e809d6b42a3743958e461e" STYLE="fork">
          <node TEXT="description" ID="055dfc7694bcc9ae25778cc3a346cc19" STYLE="fork">
            <node TEXT="获取机器人大脑检测到的wifi热点名称" ID="5d3f258aa16cfc62c3d9d626be3b2b4a" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="ab651cc12b9cd24bb44c7b78c0d731ba" STYLE="fork">
            <node TEXT="Service" ID="9ef6e47860df532eb2d2cf2e24a16366" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="162441e2464f9df6fdd092f191e73724" STYLE="fork">
            <node TEXT="WifiList" ID="1ef7579c71a55d07437616f4ce73ed6d" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="d33d9763409715afd6fd0bfa7ab535ec" STYLE="fork">
            <node TEXT="wifi_detected" ID="00a63bcdb86ac8b17048e253a87e9f21" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="ac55092248d1a1d511c5756f953edc57" STYLE="fork">
            <node TEXT="当前机器人大脑检测到多少个wifi信号" ID="c93e9744b792b95a3d3cc5c86644f7a3" STYLE="fork">
              <node TEXT="回复应大于1" ID="3db67ecd10a792ba4a1400e1f37b0f1e" STYLE="fork"/>
            </node>
          </node>
        </node>
        <node TEXT="/connect_wifi" ID="038435bc5ae022ebfc5221af96b221d7" STYLE="fork">
          <node TEXT="description" ID="e439c709db05d784b174273a3aeb10e4" STYLE="fork">
            <node TEXT="尝试让机器人大脑orin去连接wifi热点" ID="24df7f44c428d626df536057ee1b7963" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="623201706da164b9aa8e79b3c8f6d76a" STYLE="fork">
            <node TEXT="Service" ID="27933ca894e7bb25ad123a31052f62b2" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="a0b96b929b38713304a0770850595fd9" STYLE="fork">
            <node TEXT="ConnectWifi" ID="d7803646e29126714293b42a56edadf3" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="fb119d666fde0f6b1470a81cabf53b80" STYLE="fork">
            <node TEXT="connect_wifi_orin" ID="f6ec85783bb8dfe1cfa1b3d73742054a" STYLE="fork"/>
          </node>
        </node>
      </node>
      <node TEXT="/pico_states" ID="04ce5280e02594b5222a564cb3948a39" STYLE="fork">
        <node TEXT="/errors" ID="75ea40224ce386ae279fd2da9f91a6a2" STYLE="fork">
          <node TEXT="description" ID="468773d0490208c8a26e0800f1a5be44" STYLE="fork">
            <node TEXT="小脑pico错误汇总，包含over_temp,over_cpu,over_mem,over_disk等" ID="2d47087b12702e62f3765d484ee88fd8" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="eb8af437dbd213ec8134821d0c257f6b" STYLE="fork">
            <node TEXT="Topic/Publish" ID="c2e1422077940a2c0c4e1c2c3f6be734" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="2a0c85f6e5eae8fcac5cafec0958c02e" STYLE="fork">
            <node TEXT="" ID="73aa35afeb79f99fd9a7268161124e7d" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="a5ef81a111c506260d62bca3425ec186" STYLE="fork">
            <node TEXT="1" ID="9fb184dc2f554df0a00797f9577007d1" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="a6409096bb36a04037bb156a461a6418" STYLE="fork">
            <node TEXT="机器人大脑模块是否有错误发生" ID="3974dd396a30a104c557b1e551989e09" STYLE="fork">
              <node TEXT="回复应包含：没有" ID="321817ceb7fed3973271f0d53b2ce01a" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="demos" ID="3ed7805f50e2a910a0926c200eb6f68e" STYLE="fork">
            <node TEXT="over_temp_err" ID="6ae19269ab11397b72877315823307e3" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/resource" ID="db55a093b9113ace3ac3ff74cf1ee7b5" STYLE="fork">
          <node TEXT="description" ID="b7437b9429dcc4c723bc65a376a7f9df" STYLE="fork">
            <node TEXT="小脑pico资源统计，包含cpu,temperature,memory,disk等信息" ID="fbfcaf06134b78353f11720123b651e1" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="f339804785228a3fa2fe386794b0868b" STYLE="fork">
            <node TEXT="Topic/Publish" ID="79c52bb1901935fe91db991bbcb111d5" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="782bb345f9d54b4a83c5e25674ad5930" STYLE="fork">
            <node TEXT="" ID="ababa2c3d5d92a6c11fdf536407b2914" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="056fed90387fd9f6ebc2d1a0149e60ca" STYLE="fork">
            <node TEXT="机器人大脑的资源状态" ID="ddaa35c198bc02b6f8a07f3737bd16f5" STYLE="fork">
              <node TEXT="回复应包含：大脑的cpu,温度，内存，硬盘的用量" ID="ba55304a23a28d616fe4666f9eed56bb" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="demos" ID="5b709aa71b637669667e13b93ef76999" STYLE="fork">
            <node TEXT="get_pico_resouce" ID="47a5a2037c282abb54560cd2abb95a2d" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/wifi_list" ID="d3d5932fcf378f18b0d91dec3d4f5be1" STYLE="fork">
          <node TEXT="description" ID="afefc8766a7e47cb16d98f1e8ba9c357" STYLE="fork">
            <node TEXT="获取机器人小脑检测到的wifi热点名称" ID="3d0c2988bc75b04b2232e9ce58521868" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="9ab2eaa1f794ae18cc9fc75563411c7e" STYLE="fork">
            <node TEXT="Service" ID="72046f8fd62648f3ddbca8b242ce3624" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="5865cd728662ae66e6baad69d9c9b4b9" STYLE="fork">
            <node TEXT="WifiList" ID="9e92690525f3fee4204e607e42256d14" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="6219f2eecfb420889ced6187b53bbfcf" STYLE="fork">
            <node TEXT="connect_wifi_pico" ID="26307722ccc506116bb21714fdc6d4d5" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="914a404968e9534f273fec096740735a" STYLE="fork">
            <node TEXT="当前机器人小脑检测到多少个wifi信号" ID="e2b27d00a52e8b7be5529ba914ac0e27" STYLE="fork">
              <node TEXT="回复应大于1" ID="49a358294c2f4fd66d7cb633ea34799a" STYLE="fork"/>
            </node>
          </node>
        </node>
        <node TEXT="/connect_wifi" ID="8a9322b6927689a10e7e906cfc53bdd0" STYLE="fork">
          <node TEXT="description" ID="532dc280fcaec31f4217c2f7f1997bff" STYLE="fork">
            <node TEXT="尝试让机器人大脑orin连接wifi热点" ID="d9075f5cd3846bb71fa7d23b65cb4732" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="e48daa3650853e89bcd0a65d0435d987" STYLE="fork">
            <node TEXT="Service" ID="e1c54b897f1498dcd1fcd86a0e5118f1" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="70f5cefe3cbae5b7378c8e932dbc7310" STYLE="fork">
            <node TEXT="ConnectWifi" ID="6709974536e106e78912a2189537e006" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="03eb1b277ca670db2e508634e44955d4" STYLE="fork">
            <node TEXT="connect_wifi_pico" ID="8716b0ca332c950975369b7ef7d7a4cc" STYLE="fork"/>
          </node>
        </node>
      </node>
      <node TEXT="/joint_motor" ID="af07bd07a596c66395009670098a4d0c" STYLE="fork">
        <node TEXT="/errors" ID="2c74c17d0b5075cb1418725c87894683" STYLE="fork">
          <node TEXT="description" ID="159a9dcb4f0c06869c71be999ae28c22" STYLE="fork">
            <node TEXT="机器人关节电机错误信息" ID="a0d0508824f97377c3c29557e1c70b80" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="c4a1086c3f5d6d674da1eb1264f194d4" STYLE="fork">
            <node TEXT="Topic/Publish" ID="e9dae57d2bdacbfc5104c605a84cd4d6" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="706bfc9221a27ba8370b1e9582b75c79" STYLE="fork">
            <node TEXT="sensor_msgs/JointState" ID="05993bc61012fcf61ad008aaea638454" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="a650ff25220019daef9ee167b21e2ae3" STYLE="fork">
            <node TEXT="1" ID="b65d3c3a16b2365b38f186f68701416d" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="26133aebeb271b338492239fa841b12b" STYLE="fork">
            <node TEXT="机器人关节是否有错误发生" ID="06e4ff4d47c1dc57e332196deccbb033" STYLE="fork">
              <node TEXT="回复应包含：没有" ID="00025e4c2a917d8991d994de674c2ece" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="demos" ID="451cc51bd7846d5258322e600b85cbc5" STYLE="fork">
            <node TEXT="joint_err" ID="6bb110583b3318c38a6028633845d9b9" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/temperatures" ID="61bf63fc57a8806ccd7ee3058bab1388" STYLE="fork">
          <node TEXT="description" ID="4c15caf97a3cb326c070457ee746829f" STYLE="fork">
            <node TEXT="机器人关节电机温度信息" ID="50957718f77d79045095191674eac899" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="80324103a7d6b734ad9467a7d589ba9a" STYLE="fork">
            <node TEXT="Topic/Publish" ID="519ae2e1126aa827b2d6031544783a77" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="4ac6a329afa42a957a500fb527792fc4" STYLE="fork">
            <node TEXT="sensor_msgs/JointState" ID="6ee7e3a72af3cdd4efd6428ebb18c45e" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="dbe07946725fcd147bd908c8e5b93a59" STYLE="fork">
            <node TEXT="1" ID="94df3289634111b7d33daeedf517552b" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="74ef58bf9477e60786f3f046e6b7e6c5" STYLE="fork">
            <node TEXT="当前机器人膝关节温度是多少" ID="34499e155287058e7ae35e9489034738" STYLE="fork">
              <node TEXT="回复应介于10-80度之间" ID="310ba638657b0bc5af028a3b5ac68e08" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="demos" ID="59616baefe5c91b8719365259f9ed645" STYLE="fork">
            <node TEXT="joint_temp" ID="d6eca1aa0de3ee7113998f219b1b7ae3" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/set_zero" ID="7c0fdde9b1ff0814a3a8a2772e476fcf" STYLE="fork">
          <node TEXT="description" ID="5121b6195befa4e3ceca202f7a48d13b" STYLE="fork">
            <node TEXT="电机自动标零服务" ID="84097358e103afe9202448c117f79b16" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="9f5364cdfa5a091bf25109dec3c98374" STYLE="fork">
            <node TEXT="机器人关节自动标零" ID="d8a2d795a824b3ce09942c6549288ed7" STYLE="fork">
              <node TEXT="" ID="41db667eb1fc107a85f6fee4d4a3f479" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="type" ID="4bee79d2b0683a4c69d1542877d03263" STYLE="fork">
            <node TEXT="Service" ID="8dc37c5784afd93f602d78ae9e5a1b0e" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="45f3e28c9d4875c9f9c515f521435c22" STYLE="fork">
            <node TEXT="set_zero" ID="94f071698ccd72d4b34f1e6e968f424e" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="bbc9bb53f9cd3df5a12e147dc70d722d" STYLE="fork">
            <node TEXT="" ID="b870de7934315e7e4358e10f59632dd6" STYLE="fork"/>
          </node>
        </node>
      </node>
      <node TEXT="/work_status_form_start" ID="ce4e04627968e55e8a5b809e27e6d3c8" STYLE="fork">
        <node TEXT="description" ID="db2b2762ed67131c2671b5e22127d157" STYLE="fork">
          <node TEXT="机器人开机后单次工作状态发布，包含已运行时间，剩余工作时间，行进里程数等" ID="9b12f631ff4ccbe2bbeaa3e4cd3b835f" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="7fc98bd735d72b3d6aa523d3efd7dd1a" STYLE="fork">
          <node TEXT="Topic/Publish" ID="ad4c3f339e9c6164d52b971ad7c6d0ba" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="2379db54fe462da9be8a45df954b1aaf" STYLE="fork">
          <node TEXT="Robot_WorkStatus" ID="d44dfa72ddf6c78ecad9536223dba1f8" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="582ecb4f1b290274a031387f418b33b5" STYLE="fork">
          <node TEXT="1" ID="7f6116ae2f94847022ca6aa9edf7387e" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="e7b8b918697c38fe69a10b24673eb5b0" STYLE="fork">
          <node TEXT="描述下机器人本次开机后工作状态" ID="69c7dff6b695f08846d29b5b0a6fc73b" STYLE="fork">
            <node TEXT="回复因包含：已运行时间，剩余工作时间，行进里程数" ID="6232c2c8bb3377e18dda7f66fab4827e" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="demos" ID="96c0745b85e9a52060511fffbfa3d23a" STYLE="fork">
          <node TEXT="robot_work_status" ID="2697dc3d20e719ab8962b72b9b5c6930" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/face_show" ID="aee5ab1cb6e11e2a5819e7dc6073384c" STYLE="fork">
        <node TEXT="/media_play" ID="73d68c07b9e4af1b5087d0f5fe1555b3" STYLE="fork">
          <node TEXT="description" ID="405651c76ae8a982c51575cea94613e0" STYLE="fork">
            <node TEXT="机器人脸部屏幕显示,播放视频或图像文件" ID="d64c8f401e66201df78f6cfd74f9d94b" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="dcef1354cc5abdd87dd45125f8c5727c" STYLE="fork">
            <node TEXT="Service" ID="718eebbf4fdaaf71bbb45c9af358daf1" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="8a9c59172be3de281cda6a86bc7edf67" STYLE="fork">
            <node TEXT="Robot_FaceShow" ID="b4c2392ef6c3afad7778e9317e7e3d80" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="6f24f975baa6e61499d791ad791d57af" STYLE="fork">
            <node TEXT="Robot_media_play" ID="64b909b277746fa5319f9c0770f7c846" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="4d26ec9ad12537824c4be780912ec6bd" STYLE="fork">
            <node TEXT="播放“Hello_World.mp4”" ID="ccb84b74c96714ff1d0ff9279069e6b8" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/text_show" ID="33765ae14180b9e206e328cdb23dde63" STYLE="fork">
          <node TEXT="description" ID="dba6bfaff8ef71d8547aeb0c10d3b740" STYLE="fork">
            <node TEXT="机器人脸部屏幕显示文字" ID="2f4b19695a14b01550b5b1c898a900c2" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="ae9b689c664a9545ba59cd20c8521e9b" STYLE="fork">
            <node TEXT="Service" ID="d0fe1b7d3c4afc573854de61733927fa" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="8796b84e34581e04295bef582b0d5ffa" STYLE="fork">
            <node TEXT="Robot_FaceText" ID="10ab08d36654a425a899ab49d5f5c0d4" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="5634894bb824584c87a4ec57261ab6f9" STYLE="fork">
            <node TEXT="Robot_text_show" ID="8637fbc32e1ceedb4de9532d0c1bd6cc" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="d26ab6e7683f8ca1d0a9651730ed1933" STYLE="fork">
            <node TEXT="显示“Hello World”" ID="37948172e50fe652b7919123199be2be" STYLE="fork"/>
          </node>
        </node>
      </node>
      <node TEXT="/monitor" ID="1f9583b679a093bfead9199032299cf9" STYLE="fork">
        <node TEXT="description" ID="50939a667c5675ccc8b1e4c0e16a6fda" STYLE="fork">
          <node TEXT="机器人内部软件和算法模块运行状态检测, 包含上肢，灵巧手，遥控器，下肢，四目相机，深度相机，定位模块，导航模块，语音模块等" ID="d1d13c9fccb43ea1202a6cf9ed5a8966" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="de4533d2fa1913c54ee1a2788a6699db" STYLE="fork">
          <node TEXT="Topic/Publish" ID="4cec35fd5758f8c9c49d0150c9d4fbe0" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="fb7e2af36072a6c5d2c79001f984d3da" STYLE="fork">
          <node TEXT="ModulesMonitor" ID="3475022715a5555d80415edcac134af7" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="209960cbf63501a3010c76c41f105bfa" STYLE="fork">
          <node TEXT="1" ID="746d859def69cc62e632c75d47d8e517" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="60cac747488639e85b52d15ebe476fcf" STYLE="fork">
          <node TEXT="robot_modules_monitor" ID="a4168efcd666038fa1886329a6d11852" STYLE="fork"/>
        </node>
      </node>
    </node>
    <node TEXT="/upperlimb" ID="270d93ca8d749ae2125b15c10138268d" STYLE="bubble" POSITION="right">
      <node TEXT="/versions" ID="2d510ba007589b6c04f66bbd5c2e743e" STYLE="fork">
        <node TEXT="description" ID="0f0c7ebd1b2746e7aa249ac966245c30" STYLE="fork">
          <node TEXT="上肢模块版本号信息，包含software_version, hardware_verion等" ID="f2431abbfadfe2e458efd9553a9c73c7" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="5b28ba925790c099284dfd68dde141ce" STYLE="fork">
          <node TEXT="Service" ID="37bd1054fef814f5db882b6f675be49b" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="96354997e991345befe83159e9cfbf5d" STYLE="fork">
          <node TEXT="" ID="50e19853555129283a0387fdd0060ee7" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="7c2f065652931d3d70b1a316f03f9eab" STYLE="fork">
          <node TEXT="get_uplimb_version" ID="cd44e773f130387494559e50a7725c6d" STYLE="fork">
            <node TEXT="" ID="48cda95e35fb9d80d23a4194a77f087a" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="agent" ID="0c0118b838b7eb96b48120872c53852a" STYLE="fork">
          <node TEXT="查询当前上肢子系统的软件版本号" ID="a30e0768a188d415fe743443919fbae9" STYLE="fork">
            <node TEXT="应回复软件版本号" ID="e61fe620e57452d7eb11b1d0de62b762" STYLE="fork"/>
          </node>
        </node>
      </node>
      <node TEXT="/joint_states" ID="7baa7fbfc3c8f708bc5e5c3cdb9215ae" STYLE="fork">
        <node TEXT="description" ID="eff6e44536fac7edd7998add842d6c21" STYLE="fork">
          <node TEXT="机器人上肢关节position状态值发布" ID="9e68deef1142520ef28f26e56900d402" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="03dae9a3edb4bbcab67fc57f2e99a7fc" STYLE="fork">
          <node TEXT="Topic/Publish" ID="96e01155eb17ac96bee9c91832f2aa21" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="54850d9bafa36813f3ebbfc556d2f331" STYLE="fork">
          <node TEXT="sensor_msgs/JointState" ID="1a3cdf5bb502974c665923f2c784c0d3" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="f8002e45d602f1ea84d776493c049cf5" STYLE="fork">
          <node TEXT="100" ID="c645a9c2bee65a98411098fe249c34bd" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="3fd94393bf17ba6add6324ce363005bf" STYLE="fork">
          <node TEXT="查询当前机器人颈部pitch的角度" ID="705a4f640af70133ec801ff5ecb42c1c" STYLE="fork">
            <node TEXT="回复应处于+-42度间" ID="2da8633f25a3c69a62299386d0b99e5e" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="demos" ID="d604b4e76f6e89ae7f790b23eeb5e2f5" STYLE="fork">
          <node TEXT="robot_joint_states" ID="3536c5b612e4a64e1f555550a41ede36" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/cmd_states" ID="06d096758214d22caea20b148d6abae9" STYLE="fork">
        <node TEXT="description" ID="7b29bc310c36cee25ad10a003b659fc4" STYLE="fork">
          <node TEXT="上肢当前运行模式" ID="d051e82b778725dc510bb10a8fcd3325" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="5960ba2b6276c347238efd93c69e3fee" STYLE="fork">
          <node TEXT="Topic/Publish" ID="051c3d1fd3b9b63f1c51f4c65e04f81e" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="37f9f023ccc44a978eae07eb58d8fb78" STYLE="fork">
          <node TEXT="CmdState" ID="5c71deaf4b23df16c14e85f467d33589" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="91c9d9949aa5dae8c537fbacd9d2a189" STYLE="fork">
          <node TEXT="100" ID="028c0fc07457b77ecad07e24ddc68620" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="99d3fc42d3ffea51143eb9c53d55538d" STYLE="fork">
          <node TEXT="当前上肢运行模式是什么" ID="e226cc748411c6fa0a8737fb473254ed" STYLE="fork">
            <node TEXT="回复应处于停止状态" ID="f2572366e22644b24d523ba03553cec0" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="demos" ID="697bbf7842f91d6c614dee9630c9d975" STYLE="fork">
          <node TEXT="moveJ_state" ID="13750c8539803643630dbbc737ca2f9f" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/go_home" ID="5da1decae99b7050d5437f3daec70ddb" STYLE="fork">
        <node TEXT="/left_arm" ID="f85cdf94d24cbce14ffb62f5942c014a" STYLE="fork">
          <node TEXT="description" ID="f18491d6fd545b18b2241fad19446e77" STYLE="fork">
            <node TEXT="回原点（该原点数据为内置设置,不带碰撞检测）" ID="61b61ce72670a9259330d9a83c94eba3" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="74fd244a5ecb848a5943eee95038d8c2" STYLE="fork">
            <node TEXT="Service" ID="b23af861f0ed8b7e00f5289541df0660" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="96bb19fca715cc1b18e25c55a2c0264e" STYLE="fork">
            <node TEXT="std_srvs/Trigger" ID="13a32f05d843e79afde657fb8fdfae97" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="1253a2c132aeae5b313f00eeb9cca999" STYLE="fork">
            <node TEXT="left_arm_go_home" ID="a9e5ab53334d707790c7ac00f351a00c" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/right_arm" ID="492c004b7758e78cad38af2314f03d8a" STYLE="fork">
          <node TEXT="description" ID="74c15f665a731e05b443de9ddadac619" STYLE="fork">
            <node TEXT="回原点（该原点数据为内置设置）" ID="ee1f362e480a7b72aa584ee1ca8421fd" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="71bd4673abc7060e50454c0ecd36cf77" STYLE="fork">
            <node TEXT="Service" ID="ec7f32ed8fd83510647a17edbab081eb" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="35f51ddd1382579409ebded75c0b2c2e" STYLE="fork">
            <node TEXT="std_srvs/Trigger" ID="2856cf884f99e75376bdb59cc68583df" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="e13a6f9a0c1b753a3cf9dbcfed8087a9" STYLE="fork">
            <node TEXT="right_arm_go_home" ID="43ab6a56878ea239115a4100da128e1c" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/dual_arm" ID="36aa39803ba343b8d35971ae6ecbce0a" STYLE="fork">
          <node TEXT="description" ID="0ba59085c78210e2b0e6bf6b36d0222a" STYLE="fork">
            <node TEXT="回原点（该原点数据为内置设置）" ID="e4412dd132f3555e2be0b091933a6c71" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="0cfc36fc4a8bd6c7fcbc3dbd79bd3a66" STYLE="fork">
            <node TEXT="Service" ID="d4e8d3080d7d64c11d820413e424dda4" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="41e5895a54113129070b5642af971eec" STYLE="fork">
            <node TEXT="std_srvs/Trigger" ID="9ead1a1ccd9a0313186529c40cd0e527" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="7dce4650cc01e1c7e82b702da97d2186" STYLE="fork">
            <node TEXT="dual_arm_go_home" ID="6f0c1d564518763730683783851940fe" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/whole_body" ID="037dae4b528a0f071c285c3296c2ec7e" STYLE="fork">
          <node TEXT="description" ID="34b8a8b9f6974e508da8aeb2f6138534" STYLE="fork">
            <node TEXT="回原点（该原点数据为内置设置）" ID="bb4e2de95039269e9bc74619f8480445" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="fc479c77d48396b3040383d78954fd57" STYLE="fork">
            <node TEXT="Service" ID="c3f545951eed0dd0b4d1abacdd796a6d" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="57f5d389ddffb86395bf94545eef3eeb" STYLE="fork">
            <node TEXT="std_srvs/Trigger" ID="c53be210e403a8eff4be5a95cf3a7fba" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="32c200ddc78a808e56ae325237b9d907" STYLE="fork">
            <node TEXT="whole_go_home" ID="8ed993d77bd05de6d321ff99057ca8d2" STYLE="fork"/>
          </node>
        </node>
      </node>
      <node TEXT="/teach_mode" ID="ce4234b0d23a64be6fc2511c48a4008d" STYLE="fork">
        <node TEXT="/enter" ID="f7a1c0e917fd4007bad52c5eeb4fdf89" STYLE="fork">
          <node TEXT="description" ID="bbf8ddc8a566c59be5236cec1e7da028" STYLE="fork">
            <node TEXT="进入示教模式" ID="0a2ecbb1249b0964a02ee59eea23f95d" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="cd4ec42d64a30ab9dc337b71ed29eca8" STYLE="fork">
            <node TEXT="Service" ID="feafa8f85716ab35f1324dc4e3bda7c7" STYLE="fork"/>
          </node>
          <node TEXT="srv" ID="994b95a0898c5c50700de24578780981" STYLE="fork">
            <node TEXT="ArmType" ID="170671b69d973f8c7a88ee700f2ba7de" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="a885d3dc85d54f04de348c1247a364dc" STYLE="fork">
            <node TEXT="left_arm_teach_mode" ID="99cd7748d57258dd0eaa1d839e85b3cf" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/exit" ID="a57e728356621d7bd4b59deeb46fc57c" STYLE="fork">
          <node TEXT="description" ID="49eec3774798a395203ebee952f172ba" STYLE="fork">
            <node TEXT="退出示教模式" ID="4e53aee13f818da4ad79e65ad4e5bff1" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="e05f497760b032d7b4bbe1b0a58243bd" STYLE="fork">
            <node TEXT="Service" ID="a78f5bed39faff0fab352bb96438e60b" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="31509581137d47196c5e287aff5170a3" STYLE="fork">
            <node TEXT="ArmType" ID="470c15c326fccda8364bfadfecab94ad" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="9c8f23ad6b1d2ca150141ce1a66d29b3" STYLE="fork">
            <node TEXT="exit_left_arm_teach_mode" ID="be87ebf003faf4559241aa14d461df29" STYLE="fork"/>
          </node>
        </node>
      </node>
      <node TEXT="/stop_moving" ID="3fa2b9b1b95bb1d2c359759887e3e6e8" STYLE="fork">
        <node TEXT="description" ID="7e96344011566bdbaf3fe9ce913709ef" STYLE="fork">
          <node TEXT="停止双臂运动" ID="9e7b2aa10f5698b924e118e52ceb6e77" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="aeb4b56233a44319985ffec68cc1bdff" STYLE="fork">
          <node TEXT="Service" ID="fb4351fa12771197c187718542539e96" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="0573f63f04dc947c9e49a5674b899d30" STYLE="fork">
          <node TEXT="std_srvs/Trigger" ID="17ab72612a62b7535c284cbc74045ae8" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="b26fcad6905c2b15be4c3b70acace9ef" STYLE="fork">
          <node TEXT="停止运动" ID="7bbda04a51152029491a7613475d9018" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="c66b3a80e009724d599e64b541cacaa4" STYLE="fork">
          <node TEXT="stop_moving" ID="ca7b3b50b10045c4d55246c6bf3ecf9c" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/tcp_pose" ID="c16bffd21de78bdc197aeea559dd3ad8" STYLE="fork">
        <node TEXT="left_arm" ID="d8fdb62c5833e0b97e0b636e0cd14c74" STYLE="fork">
          <node TEXT="description" ID="ad8fc4121e5a09e4ec8aa75320933a7b" STYLE="fork">
            <node TEXT="左手臂末端位姿" ID="52f9c277fb877f1add68c2b4fbb53ae2" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="166c7c6341e0c6b42e85f146f678ffcb" STYLE="fork">
            <node TEXT="Topic/Publish" ID="e5577a1e4e57b0f0dea046b36e340561" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="5e423db59c342152577068e55570b779" STYLE="fork">
            <node TEXT="geometry_msgs/Pose" ID="a6edba227fee6f364ecb072abcad7aad" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="0945f567a88412dc7b4c507bddf6037d" STYLE="fork">
            <node TEXT="100" ID="301455a2a6d642bc3f8f8d8a0a9c611e" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="65da9668cac04354722c14bab8fccdae" STYLE="fork">
            <node TEXT="get_left_arm_pose" ID="5f22ca7109975333c73a77ecfad314be" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="right_arm" ID="38b2b02945938dfec7ce7debddb0bce2" STYLE="fork">
          <node TEXT="description" ID="127e4031da746283c488f0d2c64b01e2" STYLE="fork">
            <node TEXT="右手臂末端位姿" ID="2a21f3149ed8d2b7dad74ac9f37f268c" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="30559cd08540ccdc96c0a62c6511d72f" STYLE="fork">
            <node TEXT="Topic/Publish" ID="9d4d3d00cefa88371271ec8ba4f02b5d" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="4cae9a2a6357d41c9427f182cc7abc4d" STYLE="fork">
            <node TEXT="Pose" ID="d2305f2a0b5be2d429a1c82b2bebb59d" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="62c8596c66606948577fa3be65006154" STYLE="fork">
            <node TEXT="100" ID="dad680fbd878c58d84aa7f587a208f2d" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="da395f0220a03ceb4cb4ae4c7452ad59" STYLE="fork">
            <node TEXT="get_right_arm_pose" ID="92a9fb67dbd1402148343668e64fa60f" STYLE="fork"/>
          </node>
        </node>
      </node>
      <node TEXT="/tcp_speed" ID="76c9b9bd1c8ef0233d9c27faeabdc62e" STYLE="fork">
        <node TEXT="description" ID="8267503c2dca37a52eb27bf99345f8ef" STYLE="fork">
          <node TEXT="左右手臂末端速度" ID="3089ef1814e94a4e91a7eeca257e90a9" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="8aef62fd1fda9cf2152fa658ebf93550" STYLE="fork">
          <node TEXT="Topic/Publish" ID="5cf0a1d67ac2b4b7655e02f0afb495ea" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="b7b367d96b0cf4d51796e0ec30213b2c" STYLE="fork">
          <node TEXT="TcpSpeed" ID="0e2f3d34c6f8e1c93e59d0912f8f67f5" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="1fd62c4f440c5569b185bcb9be9602ce" STYLE="fork">
          <node TEXT="100" ID="8dd5b64d8187edc9a01ebd124bfa1202" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="d7e767415ec5530ef23042b4267a2fc4" STYLE="fork">
          <node TEXT="get_tcp_speeds" ID="e3df5a7dcddd08364fd8db2df8fa1448" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/speedj" ID="54a5abe1ebb59ce7398f60da42fcc5c5" STYLE="fork">
        <node TEXT="/left_arm" ID="9a82f9d7eaf045aff7b3638f3c1fa1b2" STYLE="fork">
          <node TEXT="description" ID="a9ee5b4b52753a42ab09f582d4c41ec9" STYLE="fork">
            <node TEXT="关节空间速度控制" ID="e3a4930df3309ccdbbf15dd4ee15ae78" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="2e9e827dbe441622d9a90cbd358409f1" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="dffe1bef564ef0968fe0aa7d912dffb5" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="d1b8d79024b5ffeddab0e6b2fc026c13" STYLE="fork">
            <node TEXT="TcpSpeed" ID="01a0103f051683241fa36271a54e1d1b" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="1cfa327b4c84f4172d9e17767497100a" STYLE="fork">
            <node TEXT="100" ID="da1b5350eabc8a474359df8d6635d9a2" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="d8938ae9991ee25be6b94c0dc9382ae3" STYLE="fork">
            <node TEXT="left_arm_shoulder_pitch_up" ID="21b216cf3567bf320c5435d1f7b724cb" STYLE="fork">
              <node TEXT="" ID="9d6fac3c79ba326417b9d9fb26450522" STYLE="fork"/>
            </node>
            <node TEXT="left_arm_shoulder_pitch_down" ID="35984b50e427ae15f60579cb28bd652a" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/right_arm" ID="d77eb7b1d9b517b8eb902f4c0a4a61b7" STYLE="fork">
          <node TEXT="description" ID="009136e171016fcc924fe300465eaf74" STYLE="fork">
            <node TEXT="关节空间速度控制" ID="c911341da89a17fe91d47025dbc6c85c" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="02fe754bd608519373e110f6bd3fc6d9" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="bdad1353ea5f1f304cc5cfb9d557f51f" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="41bbe607a7d7f1b1d16eae14ad354ea0" STYLE="fork">
            <node TEXT="TcpSpeed" ID="8173d71844e174052009224e0e876024" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="509db395a36fd945160be725239b103d" STYLE="fork">
            <node TEXT="10" ID="d5c391b4cec2bccbd099fc1fdbccc74c" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="509142e31baa3562b21c2b9147d192ca" STYLE="fork">
            <node TEXT="right_arm_shoulder_pitch_up" ID="864d0143caabaf1740612d4f2137103c" STYLE="fork"/>
            <node TEXT="right_arm_shoulder_pitch_down" ID="6632dbc3b4bd552c387f4ad361157a8f" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/neck" ID="3f3af7d88e569a9cabfe106d9843ecb1" STYLE="fork">
          <node TEXT="description" ID="2075ec6ecff522348ad60d99f8507ac8" STYLE="fork">
            <node TEXT="关节空间速度控制" ID="f768cf9641f81be154187117511a8d7c" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="518bc88f2ca4cafe9b7035c1fd7317d1" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="acadd6a49a5551055d5861bc6d2f71d8" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="57c6e4dcc4315a9ffba0a5e0a91ce5da" STYLE="fork">
            <node TEXT="TcpSpeed" ID="456c4b31f4d93dc9ea5c5154a6712dcb" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="8cf29fe0cae9f4a22add866e00809020" STYLE="fork">
            <node TEXT="100" ID="6d873b1577068292cebc5adab6972d69" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="60b2e7f228d63ee6cb7b4af3f14770bb" STYLE="fork">
            <node TEXT="head_pitch_up" ID="aca4a1a70407d0e13900eeb7aa2d3235" STYLE="fork"/>
            <node TEXT="head_pitch_down" ID="23db11ff05c923d66ac4649a4c440d58" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/waist" ID="d895c7865c0660c62dd721da9b7daebb" STYLE="fork">
          <node TEXT="description" ID="6f4d7226d8241a5c00ad5ce9113222b5" STYLE="fork">
            <node TEXT="关节空间速度控制" ID="7f5da6789cc5803a2f53a26ddf055e41" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="845762702f252fb0158224fba6d4682f" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="0898ed95049a13f17f79ea2cb5cfc4f0" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="26b3a27488ba5242fbd27b9c639e25c7" STYLE="fork">
            <node TEXT="TcpSpeed" ID="579ca038c30ba14e6f15c1e4b155316d" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="b3de8ea8e7a4e2fcb91bd57e86c249d4" STYLE="fork">
            <node TEXT="100" ID="b8da2fdd703ede7630677145eee04843" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="efcb31f2f8f0eec2754cad61066d9eee" STYLE="fork">
            <node TEXT="waist_turn_left" ID="3f9ab0c572dc785825f8a7fc6fd41fb1" STYLE="fork"/>
            <node TEXT="waist_turn_right" ID="837a23a213ddf8f7beb329e142cae440" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/lift" ID="e99e711d27c5c93dcfe22e9d2784c979" STYLE="fork">
          <node TEXT="description" ID="5284a77d5a684c677a0610fb6b0bfd03" STYLE="fork">
            <node TEXT="关节空间速度控制" ID="69a6d0084617b232f65726d9dbddb33b" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="3f5d8c9ca8adcdb2f3a05245c07f8398" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="619aa36f52fc33c6f549d70eb216fc77" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="7758748a9fac9677bb0ae62f138ab9f0" STYLE="fork">
            <node TEXT="TcpSpeed" ID="3a8d464a5b635a5da7a2278b839b57f9" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="b2a937aae98139eb515ef0784d33641b" STYLE="fork">
            <node TEXT="100" ID="d0a75c5173001e855c2c18c379e1881b" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="d06f382300c0b46f89be837570de8d9a" STYLE="fork">
            <node TEXT="waist_lift_up" ID="c4c77e65cc4200f55551da686d00d2f3" STYLE="fork"/>
            <node TEXT="waist_lift_down" ID="2be65ff9c3380a98ff6e27d3e66ad225" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/whole_body" ID="a3c79db0d7f4152b61a7ce8249cfdfee" STYLE="fork">
          <node TEXT="description" ID="c297c8820cc03ddacfd3c32dde14bd65" STYLE="fork">
            <node TEXT="关节空间速度控制" ID="97a7badcacd7ece9eb810717c7159feb" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="de81e3ed621b53f0fb24e89cd7eb7afa" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="f5e8748d140c6786060ee9a5d651c5fa" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="273403125c8e7c242772670f9bfec3b9" STYLE="fork">
            <node TEXT="TcpSpeed" ID="090e607943adf3dd5a176dd46204a46b" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="22557a8a3163b8951d8b226bf8b14f7b" STYLE="fork">
            <node TEXT="100" ID="812781f0e821ee7d0304b477a4ba810f" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/enable_speedj" ID="4170255208a353c62e7287e92be3f5c2" STYLE="fork">
          <node TEXT="description" ID="69a44f58a73f5035ba691731b4a2d136" STYLE="fork">
            <node TEXT="启用关节空间速度控制" ID="edd3d6575477fa86ce79d20e06da30b3" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="0e85041dd4791138a9312efc0d9fdf90" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="74530607b57c4340cbe58c3252585ae4" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="cebd2694ea48282b12921e10b00cd67e" STYLE="fork">
            <node TEXT="TcpSpeed" ID="70be21fa6156b2714bb75774e8533539" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="303081145086930545187c729a249a46" STYLE="fork">
            <node TEXT="enable_speedj" ID="64c2b2c4eacbf3bd42626a6a462b263a" STYLE="fork"/>
          </node>
        </node>
      </node>
      <node TEXT="/speedl" ID="695553b62f0bcc44c9a1f44c8d6c8197" STYLE="fork">
        <node TEXT="/left_arm" ID="ab1bcdf37b347dbd8bae546684373d03" STYLE="fork">
          <node TEXT="description" ID="24b8f3dd7dd4257afaaa611c98061239" STYLE="fork">
            <node TEXT="笛卡尔空间 速度控制" ID="9e921d78c7fcd4b3f49a76b2dc5bd264" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="34dfe649d0dae80a3437b8e7402b6329" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="ad5982e4c58ada31b7a60b2615e58bbc" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="d87ed4d7bd498ae2eca91903e0383069" STYLE="fork">
            <node TEXT="SpeedL" ID="ddd7c51bd6adf68ecbdadada078dac2e" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="2be7b4c1ed54d7cc03059b4139ba4757" STYLE="fork"/>
        </node>
        <node TEXT="/right_arm" ID="a6525d24353d29f48bd4e787ca09a774" STYLE="fork">
          <node TEXT="description" ID="6c4e0c29c6f4064030d37339006c71a3" STYLE="fork">
            <node TEXT="笛卡尔空间 速度控制" ID="c36f3e11988758c4ab60d2aaa56a5e81" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="d70edcebcc178b82292c0048f54916a3" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="38747a4379c680dfa25ddf60315012ea" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="0815ce572ab33f96a76dc6424ca54b61" STYLE="fork">
            <node TEXT="SpeedL" ID="c5e31f709206266ce89939cfd18742a4" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="9d1dec716d763a5d726c77913e79facb" STYLE="fork"/>
        </node>
        <node TEXT="/dual_arm" ID="6cca747ede620710ae5942553e4a7f1b" STYLE="fork">
          <node TEXT="description" ID="86b9d2fe35c235a32e77cb5d6ddbc5f4" STYLE="fork">
            <node TEXT="笛卡尔空间 速度控制" ID="e38799bd77a793477d8597df245b56a6" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="10356fbe09a093acd442c8dbdcc18ee8" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="02ff39dc13af1d242ae315f1b26cb37d" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="22e90f50c56a2a9cdaec0d97259a92c9" STYLE="fork">
            <node TEXT="SpeedL" ID="b8d379eafce5091ea358517a9a04af7f" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="ba85a39634f2e97d265061c865f336dc" STYLE="fork"/>
        </node>
        <node TEXT="/enable_speedl" ID="3d241ac9999bea7c8899a96af6356c77" STYLE="fork">
          <node TEXT="description" ID="197235bc9efe9d29380c0d30a6d26d51" STYLE="fork">
            <node TEXT="启用笛卡尔空间 速度控制" ID="86b4628e118944ac0129f17b6e18fe82" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="8aae411195f6ef92b73e25f5495a2331" STYLE="fork">
            <node TEXT="Service" ID="eff6c3309abaf77af475cbfe2d99fd53" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="8e6f6d1124dbd56ab0be8ca2ccc500de" STYLE="fork">
            <node TEXT="std_srvs/SetBool" ID="e625d5e6335273ba929876533ce1c64b" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="69528124230a1c8bc83f05b349cfb387" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/servoj" ID="7910674f6783ae4d774c676f00d0f882" STYLE="fork">
        <node TEXT="/left_arm" ID="cb650614dd3a8924464874c91e7ffe60" STYLE="fork">
          <node TEXT="description" ID="1a8799e98c7a03fbba6cb57d4e66e7fa" STYLE="fork">
            <node TEXT="关节空间 高频位置控制" ID="d68995e97b54d1cdc3a202657fd20810" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="8c037474ce35356d616f202f50a9f734" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="50a2abbd77e9f286baadb98aacd6e78a" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="9ab6c4a2db8df7d39fa76fbdb2eae5b4" STYLE="fork">
            <node TEXT="Joints" ID="6d51df18cf76a7cbec8e6adab53d9a8d" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="30982ce9a939639339a7f54b255393c6" STYLE="fork"/>
        </node>
        <node TEXT="/right_arm" ID="c06df18ca1c321d063d7f453cc4f9ce5" STYLE="fork">
          <node TEXT="description" ID="5e2d8b971980ccbb23c4f7b2572844a0" STYLE="fork">
            <node TEXT="关节空间 高频位置控制" ID="31788f4d5fdb8a9b8d96b608c13279ad" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="165653e15c353f4730739ecf5f02b921" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="da56ba448adfab01551a8798db4c4d19" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="e176a7c8caa8c06f6d2209037e9372e2" STYLE="fork">
            <node TEXT="Joints" ID="44c8ac6c65f6fe3faca999c3eae9de19" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="e4645a2ae445ecab63ec17899f3d0d58" STYLE="fork"/>
        </node>
        <node TEXT="/whole_body" ID="f875bab3d2d216061318fedbd339b456" STYLE="fork">
          <node TEXT="description" ID="86bdb0d6e5c6d42954dbc7bd715c6461" STYLE="fork">
            <node TEXT="关节空间 高频位置控制" ID="d4598601a51252a9fda533c15751d00f" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="c9da0f338ec8c34b339e2169236cde24" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="949d82558ccb3779fd38e4bf72d2137d" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="a3368ae410d86353e410192ffff097fe" STYLE="fork">
            <node TEXT="Joints" ID="834e4aec22e02a9f03224a77e0ee328e" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="d307f3acd4f20368c62276cbf56c0c79" STYLE="fork"/>
        </node>
        <node TEXT="/set_params" ID="bff4baf22fa888de2085eac6f66476ce" STYLE="fork">
          <node TEXT="description" ID="21d12874c16fb64835e233555e32b518" STYLE="fork">
            <node TEXT="设置关节空间 高频位置跟随控制参数" ID="fca1c1e359fb01a3061fcf64408a5188" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="07718592548f004c6675104c7a413de8" STYLE="fork">
            <node TEXT="Service" ID="f823501df48b47fb89fdf2a535a5fdef" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="1c00d6d162f9674d7bd835e5fed4b97c" STYLE="fork">
            <node TEXT="Servo" ID="6b31251bee30960f02f1a256ecaa8be5" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="c8e3d6bb3c2eaf39f9ea1994ba1ce259" STYLE="fork"/>
        </node>
        <node TEXT="/clear_params" ID="d9b587e12aa1ddf7acd32bc104084fcd" STYLE="fork">
          <node TEXT="description" ID="e33904ef4535fd861b735b519fcf9f4c" STYLE="fork">
            <node TEXT="退出笛卡尔空间 高频位置跟随控制" ID="b73481f1f9b48b4f9cc9be712efb6416" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="8b23122bd5086991492100cb5c5ac63c" STYLE="fork">
            <node TEXT="Service" ID="1b6cf5c7acbd89d3455f4469af1a3e34" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="3b478f8fd4b7f277d0b2d7c5f953e759" STYLE="fork">
            <node TEXT="Servo" ID="4770081053df6b0100421ce0cf5b0003" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="e1e1bc63d07871b2f77aceaf56dc26df" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/servol" ID="a45e6cdd6a3d750cc2db3f44577113ed" STYLE="fork">
        <node TEXT="/left_arm" ID="20108984fcfe281291c2bb80ca433c96" STYLE="fork">
          <node TEXT="description" ID="8226a19328e04e946ecc55d0a647e328" STYLE="fork">
            <node TEXT="笛卡尔空间 高频位置跟随控制" ID="9e387577ab418e9dc816bbce8baf9318" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="0e06d2ee985635286869a704240b0b3d" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="9fbfb0b4e7b1d243cb4c312c47347074" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="201a08f23980e636f71261ba738df4ea" STYLE="fork">
            <node TEXT="geometry_msgs/Pose" ID="20210aaf1b89e0195d389172aeb90db6" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="0a21c13fa03b5b69a65618cc927fa244" STYLE="fork"/>
        </node>
        <node TEXT="/right_arm" ID="65a42234109199844bbe19e8da14ea25" STYLE="fork">
          <node TEXT="description" ID="1fd7dfc36c1abe71c480285d1f17e569" STYLE="fork">
            <node TEXT="笛卡尔空间 高频位置跟随控制" ID="ddab02e5244238a4f72fae264db51d0d" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="3986129dfccdcac9ba540887485d5753" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="cf4c4234293f8c5d925dad16eb30da55" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="baf0c58326148d700cf2680b2bc1d74c" STYLE="fork">
            <node TEXT="geometry_msgs/Pose" ID="c315ab23cbd292ac2e76d3516d0131ef" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="808cf3732f2b6235e659655fa5de6f4c" STYLE="fork"/>
        </node>
        <node TEXT="/dual_arm" ID="ab4090f763bd76b9c98a4e5ca7f128b0" STYLE="fork">
          <node TEXT="description" ID="214f60e18eb7cadb5a0f267505ba9473" STYLE="fork">
            <node TEXT="笛卡尔空间 高频位置跟随控制" ID="90622d3ad0aec1cb5643077aafcc80ba" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="d1dec0ef12cee3d2c1048ea7dbc2f9c5" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="759fec404dec4df191b9feae33ccc636" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="6cd907f115e2ed20510d551e753c39a1" STYLE="fork">
            <node TEXT="geometry_msgs/Pose" ID="8cc90b935f157165d4e767ef75c76edc" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="3061fda86277c190af2acb6b078d3b28" STYLE="fork"/>
        </node>
        <node TEXT="/set_params" ID="10b55eb76901e5512205e41624fbe3f9" STYLE="fork">
          <node TEXT="description" ID="f49917f0f25bc4f22db2b70beae6ed48" STYLE="fork">
            <node TEXT="设置笛卡尔空间 高频位置跟随控制参数" ID="00e335cabd0366c3490276af18980e31" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="eef7479cbdb74d6b21411263874cd26a" STYLE="fork">
            <node TEXT="Service" ID="44e2a1aa2ecdddd58bf1fe76a3c46eaa" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="6e568d4200ae028e1d2fb6f2c6802228" STYLE="fork">
            <node TEXT="Servo" ID="cfa6212fe60d1299af0ec1f20e366a5f" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="def6ced7d5a655eab05b3ddb701bd8e8" STYLE="fork"/>
        </node>
        <node TEXT="/clear_params" ID="9a5b7030babf1788a47fcb6fc5c0e29e" STYLE="fork">
          <node TEXT="description" ID="f1de7f9f792067616a9876189a061ef6" STYLE="fork">
            <node TEXT="退出笛卡尔空间 高频位置跟随控制" ID="73a14beb5efb7f82e03a8612921a778b" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="0548b052ce6a85973b301f4f4b15493b" STYLE="fork">
            <node TEXT="Service" ID="fdef393bcd83b6363e7ad29a5ea2d370" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="4859f3446313abfa2aab67d834bd377f" STYLE="fork">
            <node TEXT="Servo" ID="579c76af73b7795b365cc725163558fa" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="2474c1797e68e6f10cfd1f8ab8cd4453" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/movej" ID="a1af83c3aef37c7953d059a8af0caf24" STYLE="fork">
        <node TEXT="/left_arm" ID="23cea1fb80b41d02ad99092b1cb88860" STYLE="fork">
          <node TEXT="description" ID="fef7e1670f47c3f9bb79d305778274e6" STYLE="fork">
            <node TEXT="关节轨迹点运动" ID="a16527faa19b08d455b3cede958872cb" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="a74b586ce08da0d38ae0ef7261877ae5" STYLE="fork">
            <node TEXT="Service" ID="46450e67c9f615efd4fe6d0578bca1cc" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="b0ec68fbe1a4a571a2c1dab0b76664ab" STYLE="fork">
            <node TEXT="MoveJ" ID="2822a95b773dc5e17df649972f9d9284" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="6ea4e760a289830c0611a88fa13ff728" STYLE="fork"/>
        </node>
        <node TEXT="/right_arm" ID="2124ba70cb1011e12246feffd9aec37e" STYLE="fork">
          <node TEXT="description" ID="2e71d89d8adea1c7b42987e7eb5a4ae7" STYLE="fork">
            <node TEXT="关节轨迹点运动" ID="93bcd2a8342476f0a0dd533a83cc2f02" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="01aa3f82be8a1f05bfb6c1253908083d" STYLE="fork">
            <node TEXT="Service" ID="9cfd0b1222ceb1c9cfe7ec63c952a5f1" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="5e1ab47ad0e98b56aaccab3d0d4c7cdf" STYLE="fork">
            <node TEXT="MoveJ" ID="a1eb90d487296f9e9b2c6b85310d743e" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="e4401c172e0729c68eb8c58256f868b1" STYLE="fork"/>
        </node>
        <node TEXT="/neck" ID="01c914b81c1d23a23ac3dfec9cea4a16" STYLE="fork">
          <node TEXT="description" ID="fc9dba2212165b9f8c62f6d77c3a5c99" STYLE="fork">
            <node TEXT="关节轨迹点运动" ID="21b29f2d7b9d9894e4cc8f3bd5a042c7" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="54825d9fc3d8b7801a58c3bcef18a885" STYLE="fork">
            <node TEXT="Service" ID="b5813fd6a0d907986788b81355f12f62" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="cba35131a29901b0e9ff923e32fc2a72" STYLE="fork">
            <node TEXT="MoveJ" ID="2e582d37f887b11c8b877ccb61610256" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="3a32ab12319070d5714eed2958a1514e" STYLE="fork"/>
        </node>
        <node TEXT="/waist" ID="2d8eee6549de599f44d66cdf49a73cce" STYLE="fork">
          <node TEXT="description" ID="40feee2bb8f81c90d4ab7f19e4fb0f30" STYLE="fork">
            <node TEXT="关节轨迹点运动" ID="78a6770b5858ca9640184325c75b7ec7" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="1977a9967d721839855a05143a1b76f3" STYLE="fork">
            <node TEXT="Service" ID="cf9b1d273503a3fa7536ec3128340110" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="22c853999ccf3972c18a74da816452b1" STYLE="fork">
            <node TEXT="MoveJ" ID="325dd4f74309f7fdd88dfb1d91a22d5c" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="e8981cfc878cc0606fdb31d17a0936c4" STYLE="fork"/>
        </node>
        <node TEXT="/lift" ID="554c26f0abe3324cbbd8b70f0305b166" STYLE="fork">
          <node TEXT="description" ID="23bd2c8dc0785f26c9af44cc5cb2c9e7" STYLE="fork">
            <node TEXT="关节轨迹点运动" ID="fa581526bad94a498e2fe699405d7d72" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="d0c465df7faead650d2cfff906708691" STYLE="fork">
            <node TEXT="Service" ID="fcf7a1ab0dda306de993589043359b6d" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="ebd11a1faab09334175b6bf347c9fb90" STYLE="fork">
            <node TEXT="MoveJ" ID="526d812c1a09430212f134dc66ac0ed1" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="3341072ba3e491b0e9115abda67108f8" STYLE="fork"/>
        </node>
        <node TEXT="/whole_body" ID="f083ab47a2032bbc6ed0809076204924" STYLE="fork">
          <node TEXT="description" ID="be23038b7c69acebb3acde46cb83f3fe" STYLE="fork">
            <node TEXT="关节轨迹点运动" ID="af094db7cf722c1a243a5506a98dc348" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="8e0d2080bb6c9756262fa8e58746c1cc" STYLE="fork">
            <node TEXT="Service" ID="f75f0caae3ef2cd0e895cbcd30b86a03" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="7c441b92671ada09cc8bd1547c32a3a8" STYLE="fork">
            <node TEXT="MoveJ" ID="a225ef5ec4ac9eb4dab14c40a349d45d" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="195e8ea53ffe822550d25239ce48e6f0" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/movej_by_pose" ID="c38261dc1049b7e7f16db22692a912da" STYLE="fork">
        <node TEXT="/left_arm" ID="5243ae46a01eb91943963dc14b4532c4" STYLE="fork">
          <node TEXT="description" ID="aaddaf0c8b66ca80282e7cc60af1765b" STYLE="fork">
            <node TEXT="关节轨迹点运动(通过位姿)" ID="2cec8c5b3bd38528ae24a94b88b54aac" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="bd313ddf75a620d27d3ff829720c92fb" STYLE="fork">
            <node TEXT="Service" ID="a0a8c1288240f3a663b48cc83ea44321" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="8c8b63ed971371f74dc5b7162c626350" STYLE="fork">
            <node TEXT="MoveJByPose" ID="0b6819cb779530985d5f6146fc76f675" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="d587d16fd23f432c3b471e2bed25a5a5" STYLE="fork"/>
        </node>
        <node TEXT="/right_arm" ID="11ab7902d08559ab172efc8e09bf523a" STYLE="fork">
          <node TEXT="description" ID="7841f155636796f2585ea45536a1f09b" STYLE="fork">
            <node TEXT="关节轨迹点运动(通过位姿)" ID="ac52405c5584d955c2f90929f5a8a9a2" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="db5ff49ef879c4b9043033a2de1e956b" STYLE="fork">
            <node TEXT="Service" ID="e0bea69ce496d47bda011625389ce298" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="e805b1b7a43e099d07d1079121074d1c" STYLE="fork">
            <node TEXT="MoveJByPose" ID="a06797bc52d51b3d05fbad69badf8711" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="a3777ed5f71ba2a568720df090155eae" STYLE="fork"/>
        </node>
        <node TEXT="/dual_arm" ID="408e3942e2871a7f1a37595747d94a3c" STYLE="fork">
          <node TEXT="description" ID="10b2e3f301c6790b4678655b44142e0e" STYLE="fork">
            <node TEXT="关节轨迹点运动(通过位姿)" ID="ca4ed08e40c442740c9acbbfb2a14f33" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="cb4ed10f2c2285ebb3d72663c44df2eb" STYLE="fork">
            <node TEXT="Service" ID="d159bd652f045fe2882073f77e3e7ac5" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="5dd0a9919373581dd8a5e87c7ccc545f" STYLE="fork">
            <node TEXT="MoveJByPose" ID="bd2fbf7419c729c314d2bc244680779f" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="987f6b9b49a7e6aa8f46aa9c0678ccb6" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/movej_by_path" ID="e22688175ead23f087e07215b08b0149" STYLE="fork">
        <node TEXT="/left_arm" ID="2e236a0b2457852c0cf0593fc91c9220" STYLE="fork">
          <node TEXT="description" ID="7dd4679669e3fba0f2293f063096ec62" STYLE="fork">
            <node TEXT="关节路径轨迹运动" ID="04567876c91e9fbecb49e06451677662" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="06f50eb3b63e4301cf61d58c8cd0dffd" STYLE="fork">
            <node TEXT="Service" ID="c203b2876e030c3db566124d23937554" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="b34652c4da44960591e9e85daef1eac0" STYLE="fork">
            <node TEXT="MoveJByPath " ID="b5952655363727e854b4c7ede212760f" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="f8c7a4b64d62a6ace1432089b508cf46" STYLE="fork"/>
        </node>
        <node TEXT="/right_arm" ID="972b943d7b9e48f2eba437d4140918d2" STYLE="fork">
          <node TEXT="description" ID="55a76e25deadb23196625718016180dd" STYLE="fork">
            <node TEXT="关节路径轨迹运动" ID="1cbf01271d3792fd7ead073bb65902dd" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="135131c85c09ff6dba999c7f2a011633" STYLE="fork">
            <node TEXT="Service" ID="0c0418dbb2723ab300e14e20535d3c3f" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="9107da85d3ddf7513b6421bc2c37fbf4" STYLE="fork">
            <node TEXT="MoveJByPath " ID="d1532830709b6e2f779d0c03cb307eeb" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="bacfb37af43447dbab09e263b6347846" STYLE="fork"/>
        </node>
        <node TEXT="/dual_arm" ID="4ec85af0cd71808f050bbfe8d7acab05" STYLE="fork">
          <node TEXT="description" ID="375cdd9ac911d71af2e8288024008fc0" STYLE="fork">
            <node TEXT="关节路径轨迹运动" ID="7769bd67ae7560bae91fe99d0a7830b0" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="9dbc6448cb4abac0a03e0878d9a9df17" STYLE="fork">
            <node TEXT="Service" ID="ffda1040e2da8c21b9f59c7220603a2d" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="307d1a0cc2ce45d801bbd0be76712aff" STYLE="fork">
            <node TEXT="MoveJByPath " ID="8c2fa3d741342977e4533f11de718bf3" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="fe1ad8a6c6ce254650a0427ed8989fe6" STYLE="fork"/>
        </node>
        <node TEXT="/whole_body" ID="ffbeea113737bc692e0eb6d736a9d79a" STYLE="fork">
          <node TEXT="description" ID="84945106eafae98633ff0b24f55cc4c8" STYLE="fork">
            <node TEXT="关节路径轨迹运动" ID="d16309b05cf9007a3145f9f3e36862cb" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="ad3549ce7bcf71263ee0906c72ecf862" STYLE="fork">
            <node TEXT="Service" ID="341b97d5cca0791c0e9910f42b16f266" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="921fc731c9de11f294c2da816ce90cc4" STYLE="fork">
            <node TEXT="MoveJByPath " ID="53fcff2b34b4509981f84f7535b39380" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="b421876b287fefa2b5c3dd1404b0f940" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/movel" ID="21546f1b0443912aeaf5a41944b8cc6c" STYLE="fork">
        <node TEXT="/left_arm" ID="124b4410800935752006be279946171b" STYLE="fork">
          <node TEXT="description" ID="08e6c3cf58e9dc201db8902fa151a492" STYLE="fork">
            <node TEXT="直线轨迹点运动" ID="0d1c9efdac25724a286843c83c3a05a4" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="4a459fc66059b4107e08201bb245cb98" STYLE="fork">
            <node TEXT="Service" ID="3af4ecb71b0d055652750db5f71b8f6e" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="d11aa3ad1f119ef5cb4929f8e9c13a13" STYLE="fork">
            <node TEXT="MoveL" ID="b40b48b96242d9ffc9f74a14b7fc1186" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="ee470bb29caf068de2e7fd755aa1870a" STYLE="fork"/>
        </node>
        <node TEXT="/right_arm" ID="699e3421d1f186f8eb9b4da3638dbbd5" STYLE="fork">
          <node TEXT="description" ID="ae6db1b44b037d1e2df9f0060fca2eba" STYLE="fork">
            <node TEXT="直线轨迹点运动" ID="d19e8e0394b3584fcb839e2270d32a93" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="3c67d7ee9e2dd178fa1710ae06df6318" STYLE="fork">
            <node TEXT="Service" ID="139e2a2ee57e278949c5a63c4d54e0f3" STYLE="fork"/>
          </node>
          <node TEXT="srv" ID="3d8474ff15b42c09761c558b52505aba" STYLE="fork">
            <node TEXT="MoveL" ID="af76ef7196e1a4ed427bb140953e7124" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="81ab7e3bbddd112eb4bab3701e807518" STYLE="fork"/>
        </node>
        <node TEXT="/dual_arm" ID="62f1513b879110dd08e64b4d992eddf6" STYLE="fork">
          <node TEXT="description" ID="ccafb0b403f216606de54e0b3b883ad3" STYLE="fork">
            <node TEXT="直线轨迹点运动" ID="978695970a0740771fc605d925d9f91a" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="8401e2fd7adf5a0f607811315d2c5496" STYLE="fork">
            <node TEXT="Service" ID="45c4833afa843fd14d7c6f32629be4d5" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="6073a7a190fa1ac05bc069dc4986ff19" STYLE="fork">
            <node TEXT="MoveL" ID="0679666653b6a172298a79d0e26cbb2f" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="9448269dc8c9bd07caddcbff21721ebe" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/movel_by_path" ID="37f1be049ba261a28743064a983f60ed" STYLE="fork">
        <node TEXT="/left_arm" ID="2488306e2fc451600ca862fec1960177" STYLE="fork">
          <node TEXT="description" ID="c552b7e6f326313115eee8fe9dd44ef4" STYLE="fork">
            <node TEXT="直线路径轨迹运动" ID="aa6c8fc393857b4f60366d4ef6f85934" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="5b30aa03ad89777dfec5586a5c0d5ba8" STYLE="fork">
            <node TEXT="Service" ID="60a8a94fc1e1b376a6e8289bea57fab8" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="1c0b2684b38af34d0d4d1548bafd93f9" STYLE="fork">
            <node TEXT="MoveLByPath" ID="a86011a0505bbf52cfe2833e07ffdb29" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="dc09a8587d988a98ba7b5e9c95d61f4e" STYLE="fork"/>
        </node>
        <node TEXT="/right_arm" ID="c89ce08c290928c0adb1b29b9bd67e3e" STYLE="fork">
          <node TEXT="description" ID="bf79968c8b5f2b1b943f5cfba021bc77" STYLE="fork">
            <node TEXT="直线路径轨迹运动" ID="cd61997cf294c5b9a72c55b9dfbc9890" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="a525013758a55eba2138b260074ad1f5" STYLE="fork">
            <node TEXT="Service" ID="094a17dabe0e41e7f398e995bccadab4" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="b4df865c351b56832b06d9e8eff7daad" STYLE="fork">
            <node TEXT="MoveLByPath" ID="3ef2c1bcaed7f01508f59e9b4e9eb83d" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="2976c589a0ab47a99b555e4e351da3b0" STYLE="fork"/>
        </node>
        <node TEXT="/dual_arm" ID="fea8b00ee96e1b3f8ae349bf4c673597" STYLE="fork">
          <node TEXT="description" ID="002fc53d05e90aefd07f5243d9f7daf3" STYLE="fork">
            <node TEXT="直线路径轨迹运动" ID="ad62e79158695c2cd5ae2ad7d65253b0" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="84bf420d41e6324d5a444ab782948aa6" STYLE="fork">
            <node TEXT="Service" ID="cc693b50aa501f8f919c3abb3d0c0091" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="332d9323c258c25ba9ca9165c1b2bc30" STYLE="fork">
            <node TEXT="MoveLByPath" ID="49a6fc272afd00597fbf6c66f876c3ef" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="e3aa9baad475603798df7884a83b33e6" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/IK" ID="ca5ba01569a8c392922f1e59b38fcd07" STYLE="fork">
        <node TEXT="/left_arm" ID="7cf4d60c01910569abbe3f725f9e6884" STYLE="fork">
          <node TEXT="description" ID="9cda60e841fbf800ee42560df07e0117" STYLE="fork">
            <node TEXT="正运动学求解" ID="7a2351d01a36bcc838bbe017b59ceb6c" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="28bb477eaa19ea7339b81032d3feca94" STYLE="fork">
            <node TEXT="Service" ID="598aa58bc5ba87843a14226405f66b2d" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="ee40aaebee41cbc8d26f25f567ff53f9" STYLE="fork">
            <node TEXT="FK" ID="b1368aff749d95a05b8307f330df8fa7" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="97cd6e2c1ecc0d42e1297f951a3af37a" STYLE="fork"/>
        </node>
        <node TEXT="/right_arm" ID="a8864c3532127c94258f18fa59211e7a" STYLE="fork">
          <node TEXT="description" ID="0eb41c66ba7e1db80bed5f6444bd8ce0" STYLE="fork">
            <node TEXT="正运动学求解" ID="103f2d95be1d6e7dbd55a51aec05b4a7" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="e618cffa5b953a31ea950dac9be86c9f" STYLE="fork">
            <node TEXT="Service" ID="cfbe93a2721df1819a5078a8068581bc" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="0f31d09a2b4832762d79487ecdca0939" STYLE="fork">
            <node TEXT="FK" ID="fef770a8b447d969daa7f493158f7c52" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="948c2875d3c0191ec837185777d992bf" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/FK" ID="89769c46e68a40ec3f6ea95da9e5d261" STYLE="fork">
        <node TEXT="/left_arm" ID="940f87ae36982d990e0b82f08ed8bcc1" STYLE="fork">
          <node TEXT="description" ID="caf8d66b93bc21062ed962000f00e1a4" STYLE="fork">
            <node TEXT="正运动学接口" ID="38c69787326b86b7b3ce46505f3eba88" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="15914af326921482a2352f868434b5a1" STYLE="fork">
            <node TEXT="Service" ID="dee47a4120659eee31a8e2a82d3aeb51" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="4db7abdffda1dc4fc9b00a38e00cf091" STYLE="fork">
            <node TEXT="IK" ID="9a52aac7804f7016c1cd39429a449872" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/right_arm" ID="2b764ae281962b31eda19c38a1a947b3" STYLE="fork">
          <node TEXT="description" ID="73bf3b4c347ba1394ee02bf763bf18df" STYLE="fork">
            <node TEXT="正运动学接口" ID="917d98736fa8dd69d2804428cbb7366f" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="5261298ead736dd528a72a9f757e7d46" STYLE="fork">
            <node TEXT="Service" ID="8654d9a8977124afc12a4529e183d258" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="0521b1aa0de13d91d0a4bc51cf272f1b" STYLE="fork">
            <node TEXT="IK" ID="3813b8b096df1c7d63cf0ab0684b6444" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="0c3713db258e016ec3592b4de028d243" STYLE="fork"/>
        </node>
      </node>
    </node>
    <node TEXT="/hand" ID="3d42ce44223aca29de0165c68d110c43" STYLE="bubble" POSITION="right">
      <node TEXT="/hand_joint_states" ID="0b5368ceb5074c28d2b1715eea61a371" STYLE="fork">
        <node TEXT="description" ID="b1ebd4fadf4b58619eaaa34238a3ad72" STYLE="fork">
          <node TEXT="手部关节状态" ID="50204df92435dda949e1efcfa0376556" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="df58a5b3262894c6bfdb8b337f6d992a" STYLE="fork">
          <node TEXT="Topic/Publish" ID="bd12d222ed7128b354e7b9540ab0819f" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="1461168d1c0ac61a8df26cb2d39aa1b7" STYLE="fork">
          <node TEXT="sensor_msgs/JointState" ID="fdb3a1fa7f29118ed6c8e3527340c87a" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="b842b1a85e2746997ee0bd801975e217" STYLE="fork">
          <node TEXT="100" ID="da04c69d1137a65b5d0c16120a58170a" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="48c7c7a3bb3d30defa0b0016e4684e11" STYLE="fork">
          <node TEXT="当前左手食指的角度是多少" ID="b16dceb03e34735b0529fcc7f43910b2" STYLE="fork">
            <node TEXT="应回复0-80度之间" ID="f051769010fa7bea24e7d8448adb81da" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="demos" ID="6c2568ec60f01a28009e840704511eb5" STYLE="fork"/>
      </node>
      <node TEXT="/wrist_force_6d" ID="27b7bb1bfa15513f40073c11dc1364da" STYLE="fork">
        <node TEXT="/left_hand" ID="d55383fb55eea1c9ec167dcb13443aef" STYLE="fork">
          <node TEXT="description" ID="16690ee55ad6a909c19885a64c460de3" STYLE="fork">
            <node TEXT="右手腕部6维力传感器值" ID="208864a1948394da095b217c4df68843" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="086205970753231b60fb651687a1875a" STYLE="fork">
            <node TEXT="Topic/Publish" ID="1cf4ae8462c3da6acfa27fbe32e2de7f" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="e920b4204fe61d769fb1f8d1879b9cb1" STYLE="fork">
            <node TEXT="geometry_msgs/WrenchStamped" ID="bdd6b9a35990e1b855a45b47b51dbcd7" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="1d6f0c3e238b2e7a6e795c6cf3c12390" STYLE="fork">
            <node TEXT="100" ID="736283f3917f6c5e53cfa0f66bc7db5c" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="e52a471abe83eb14d6bd6b8fe1cc800c" STYLE="fork">
            <node TEXT="当前左手腕部的检测到多少力" ID="e14bfd5f346e04ebfa86a6dfd16304a3" STYLE="fork">
              <node TEXT="应回复0牛顿" ID="21480fac8cbb8103dd8e4e93feee1860" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="demos" ID="6db6a737adf7c2e2c57ce0c655faeba2" STYLE="fork"/>
        </node>
        <node TEXT="/right_hand" ID="7aacdaaf02f783cd7e378711d983ffb7" STYLE="fork">
          <node TEXT="description" ID="1c08959bcb8f4ad3550f064b84697524" STYLE="fork">
            <node TEXT="左手腕部6维力传感器值" ID="be6af99dcbf5befe199812c89d2832d2" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="98696c36714e0948c52fc50f360a3f9f" STYLE="fork">
            <node TEXT="Topic/Publish" ID="3ad0930b89084633015a77ef4b982700" STYLE="fork"/>
          </node>
          <node TEXT="msmsg_typeg" ID="c533294a9d772595b6a88596d0030362" STYLE="fork">
            <node TEXT="geometry_msgs/WrenchStamped" ID="0a353e1bb6e67f2c7a1d0039eae2de74" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="76a9671a2b426a0dbfb3ecb02a168cc4" STYLE="fork">
            <node TEXT="100" ID="291a803191af879ff294d1960e664f55" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="522b33c0800ff6509306e5b6ee3c4f17" STYLE="fork">
            <node TEXT="当前右手腕部的检测到多少力" ID="23954ba10b1334ba884ad2c60b3213b6" STYLE="fork">
              <node TEXT="应回复0牛顿" ID="5d5938af9c7787ee336399bdc590ccde" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="demos" ID="308c7fae3699958d74a77d1b36b2f0ad" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/finger_pressures" ID="ab633b3152eccebe9cfe5aff1ac30c07" STYLE="fork">
        <node TEXT="description" ID="06f589ec2b48ab056f181b9fbc6d2eab" STYLE="fork">
          <node TEXT="手指压力传感器状态值" ID="6a1e1681cce820faf76beda0bc511048" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="28b6585c2fa9b14e945f4e49acfc2b57" STYLE="fork">
          <node TEXT="Topic/Publish" ID="2ddffdff7e3ddebd4750ea59f65b459c" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="78d64f79e018698d8b7507e44f486629" STYLE="fork">
          <node TEXT="sensor_msgs/JointState" ID="5fde67900e089b825b6db46bb78b2de2" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="1d23fca23590c52a571f03b1c7acf006" STYLE="fork">
          <node TEXT="100" ID="70adaa73242e5b7c96239eba38ccfb44" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="78c60442dc3c79934795a096b18727f8" STYLE="fork">
          <node TEXT="当前左手食指的检测到多少力" ID="c4046278c7ce6eb4fcdcda9e5a1844f0" STYLE="fork">
            <node TEXT="应回复0牛顿" ID="6ce1dddcfeb0ef06db73307cfc0025e9" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="demos" ID="0fbc27e94226fb8bac8a47226cb4795e" STYLE="fork"/>
      </node>
      <node TEXT="/gesture_switch" ID="6e1dd53699e2f5b86cbaee33e2aa5680" STYLE="fork">
        <node TEXT="/left_hand" ID="9811fa40f98d91822b73c5b21eda9156" STYLE="fork">
          <node TEXT="description" ID="681177d293f5439490eb61f4594c5caf" STYLE="fork">
            <node TEXT="左手掌手势控制" ID="387132d30f3c870061a69fcb598bb898" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="fa9c4c60075f4c5b70b3603ac867f2d1" STYLE="fork">
            <node TEXT="Service" ID="c97a519da5a1c20907015fe9a306c2bd" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="8d63bef9160ca278cf4ab94e92f0c4b7" STYLE="fork"/>
          <node TEXT="demos" ID="2d1816cd4439f36453275670c786a6f5" STYLE="fork"/>
          <node TEXT="agent" ID="f652eaedbf3aa2e95d6c66a454d64eb4" STYLE="fork">
            <node TEXT="左手摆出1的手势" ID="c512353c404f05d3be7a4caddaebe1ec" STYLE="fork">
              <node TEXT="订阅/hand_joint_states左手中指数值应大于60" ID="97f0968679e2d865553650570b8f43fd" STYLE="fork"/>
            </node>
          </node>
        </node>
        <node TEXT="/right_hand" ID="241f0384050d6c3e8f99eecf2565b92d" STYLE="fork">
          <node TEXT="description" ID="be0dda96e5fce2fad7e6483804fb6900" STYLE="fork">
            <node TEXT="右手掌手势控制" ID="bf2bc5bf2a77700b3c09d7ba7c4861cd" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="f9b217107ec77a8be0316fccf2dacc6d" STYLE="fork">
            <node TEXT="Service" ID="458bfb83d1c72fed5f2388ad38d3d86e" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="ef85c7d80d4f1480d442c632c888ab49" STYLE="fork"/>
          <node TEXT="demos" ID="6f4b9c3f48766e96ea89160d42a0cfb5" STYLE="fork"/>
          <node TEXT="agent" ID="802aec548f665314467b539bc46b9d40" STYLE="fork">
            <node TEXT="右手摆出1的手势" ID="ea7645c2079f31db05143933a3aca9a7" STYLE="fork">
              <node TEXT="订阅/hand_joint_states右手中指数值应大于60" ID="fa3bb606ce72c9374da1e31abffafb98" STYLE="fork"/>
            </node>
          </node>
        </node>
      </node>
      <node TEXT="/task_switch" ID="b1d7b0db94a45b6036a9eb842e80ed1b" STYLE="fork">
        <node TEXT="/left_hand" ID="0c539709fe0c0429533a634ca10c0130" STYLE="fork">
          <node TEXT="description" ID="ad19cc96590d4d06e092cc5abf772b02" STYLE="fork">
            <node TEXT="左手掌任务控制" ID="6163484f23220f2625cb94850b27ec90" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="52e19ee744b384a06e6cffc9e8792880" STYLE="fork">
            <node TEXT="Service" ID="0b92c3e5192c16266c149559ec91a5e7" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="cb5891801b12f368ab52afa8bfcf41e9" STYLE="fork"/>
          <node TEXT="demos" ID="ae74c0b1b4fe7e60999fe2b06f36013a" STYLE="fork"/>
        </node>
        <node TEXT="/right_hand" ID="eeacf28dc0fc1d765b09e6a433c7f94f" STYLE="fork">
          <node TEXT="description" ID="691c89aa7eb29ff79fce3b8ae4203d53" STYLE="fork">
            <node TEXT="右手掌任务控制" ID="cd247cee7d33dc689dc4f5d4a7554cbf" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="afad52f76dd0bab9ce7dc5061284bc22" STYLE="fork">
            <node TEXT="Service" ID="b907ce1417fae016fadd741a9ce2f71d" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="d75a712bf7453fae9e3ab1ad07b7d247" STYLE="fork"/>
          <node TEXT="demos" ID="b7d11ddb0b6048e6af1cb1f72b155005" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/joint_switch" ID="e625bd6ff1b555dbabfc5cc20af1a49d" STYLE="fork">
        <node TEXT="/left_hand" ID="2a45d200617dd54df594184659f6c805" STYLE="fork">
          <node TEXT="description" ID="d04bed7ea01d028a3ab3c8d8946c8347" STYLE="fork">
            <node TEXT="左手掌关节控制" ID="247025c9f5515a982a96dca7e6bf4c60" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="e3546bff5bd376279b0af8103f389b8c" STYLE="fork">
            <node TEXT="Service" ID="969041568152b2c72e6f7be37d4718e8" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="9de131469a018e7a48ad306db30ef049" STYLE="fork"/>
          <node TEXT="demos" ID="7eef2e5de268d5a43b276dd19445d494" STYLE="fork"/>
          <node TEXT="agent" ID="0cc61361111fe6f57f0a0996a616ed70" STYLE="fork">
            <node TEXT="左手食指弯曲40度" ID="3b35ef50f98008eb0f7139f74e398320" STYLE="fork">
              <node TEXT="订阅/hand_joint_states左手食指数值应接近40度" ID="6a6a8633f1c42cf3b225abdd8ff4464c" STYLE="fork"/>
            </node>
          </node>
        </node>
        <node TEXT="/right_hand" ID="cd482eed5573666994883b79927826ea" STYLE="fork">
          <node TEXT="description" ID="24c8e9984fd76b300d29ad1788e04ec8" STYLE="fork">
            <node TEXT="左手掌关节控制" ID="1f155bf4bfd3c90f4bf2ef5c4c3aa4bd" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="e01359860d6cdf27304d2d662ea48749" STYLE="fork">
            <node TEXT="Service" ID="5479141b954fa955f4c931b33e347ce0" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="de945fbd4ab522d946411f9f720d3956" STYLE="fork"/>
          <node TEXT="demos" ID="bfd1acf782371b749a4b1c4d459c8be1" STYLE="fork"/>
          <node TEXT="agent" ID="cabe150e4756c42d99c91e6356043397" STYLE="fork">
            <node TEXT="右手食指弯曲40度" ID="c781b60c5e72f296b0314705871e95cc" STYLE="fork">
              <node TEXT="订阅/hand_joint_states左手食指数值应接近40度" ID="c19830df23c5c49d6c2a5d5199896585" STYLE="fork"/>
            </node>
          </node>
        </node>
      </node>
      <node TEXT="/versions" ID="dcdfded576c3d7140367ec4e6f0698d0" STYLE="fork">
        <node TEXT="description" ID="6f2c8b703c5004d2bbb832184f79881f" STYLE="fork">
          <node TEXT="灵巧手版本号信息" ID="4ebde7162aa553bbbdc4f06ac6206278" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="aa507854b9f6eada4841e74431ac8aaa" STYLE="fork">
          <node TEXT="Service" ID="2b1a525c168bdf17eb264c90234a9e40" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="0623ff4c5c93526693bac14023f734d5" STYLE="fork">
          <node TEXT="software_version, hardware_verion" ID="26048ac87c5377a22fb075fa335556bc" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="cc23d963d93b2798c693de81a03914fe" STYLE="fork"/>
        <node TEXT="agent" ID="0c55101e3c25444df6607a9f90a51363" STYLE="fork">
          <node TEXT="查询当前灵巧手子系统的版本号" ID="cf0edefe45bf149d933e1973253e35f7" STYLE="fork">
            <node TEXT="" ID="a42e3bb0321848f3e31a0d688473b5ec" STYLE="fork"/>
          </node>
        </node>
      </node>
    </node>
    <node TEXT="/lowerlimb" ID="f29a5da1169c482398f676b404b8f274" STYLE="bubble" POSITION="right">
      <node TEXT="/cmd_vel" ID="86625d5ef9f6460dba8d2887e1f0daf8" STYLE="fork">
        <node TEXT="/joy" ID="661250af6e0b37540b091a116a01eb31" STYLE="fork">
          <node TEXT="description" ID="06d463563d62f2c0ae5a69fd0168f1b8" STYLE="fork">
            <node TEXT="游戏手柄控制行走" ID="2a26f6a3ecc18583ec0cb787d3a009c3" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="ad536896af3c73d57982501af339b54f" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="68521d8b75863cd47a79585d6f817364" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="79698d8dd37e6bb9b7cb2d8b5f736a2e" STYLE="fork">
            <node TEXT="geometry_msgs/Twist" ID="3e67943dadfd1db3a8e5a1ee2ed3e5e3" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="79251742b80afa22171b1fa7242c2d07" STYLE="fork">
            <node TEXT="10" ID="123cd405328e750a7b5292ba213a56e0" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="0d38ec8ca0c818bd0dd18b61f9e69f0b" STYLE="fork"/>
        </node>
        <node TEXT="/web" ID="fbed2aa2ba7f524f2fc14ff3ef0d4b9c" STYLE="fork">
          <node TEXT="description" ID="377552e83f763f3142f25d307a844e59" STYLE="fork">
            <node TEXT="网络控制行走" ID="4dc8759a8b12e94ebc24a0bd52741383" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="6b7ecee6a4996dd014d5456e5df6e14e" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="7f963f53c193c6c911d4e37c2714e35a" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="567a6084a85b6d3ae2925edaf2b15d87" STYLE="fork">
            <node TEXT="geometry_msgs/Twist" ID="7873c9ae7ae8c4ba54fd680437f1e409" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="2778003fd7eb6320f8caae977008fe64" STYLE="fork">
            <node TEXT="10" ID="4b17224720b61524cf5023b2ffea05a8" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="2e8ff527200749bc595fdfc6316d36c1" STYLE="fork"/>
        </node>
        <node TEXT="/calib" ID="7b12c8dff6b7f11c934f55e0361c920f" STYLE="fork">
          <node TEXT="description" ID="fe37ba5a4d883df7a29afa5fbf26a443" STYLE="fork">
            <node TEXT="导航算法控制行走" ID="da25890a826690025d9b11c0ef920e0c" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="0724b044ed723e92cbfdf8264625d4b0" STYLE="fork">
            <node TEXT="Topic/Subscribe" ID="ca1b58ef96b6a792c636a5b983e96da1" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="f04c185cc280733a86f2bc0924c9bd1c" STYLE="fork">
            <node TEXT="geometry_msgs/Twist" ID="671697961f4acb5aa0d67b1a2a017070" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="bd87435a53dbeef4c1ab97e63f1105ba" STYLE="fork">
            <node TEXT="10" ID="72e14c96fa33e0d82f4cf51c9cc0a61d" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="ec86c91b343861c531d1d25aeec0bb87" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/set_stand" ID="e30a52f43209046c34fc5cffffe84ed4" STYLE="fork">
        <node TEXT="description" ID="8d3c0349cb42622fa618bfcb102a9b43" STYLE="fork">
          <node TEXT="站立姿态初始化" ID="6cb97234097e3199125389e5f8486759" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="9ec66024f09219f37aa98896448b53e4" STYLE="fork">
          <node TEXT="Topic/Subscribe" ID="47f2d3275dc3e80240310e88b4e53968" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="3ce4aa7eefb2e39734c114958acbb829" STYLE="fork"/>
        <node TEXT="demos" ID="b5a6f70eec9656a001e4aeac1e8295c7" STYLE="fork"/>
      </node>
      <node TEXT="/set_lie" ID="ee706ca6ede82685cdd3eb2eaf2830f5" STYLE="fork">
        <node TEXT="description" ID="36a7a4eccc2a7153a3ff3bf95254c6ac" STYLE="fork">
          <node TEXT="下肢泄力" ID="e67c2b496ec3375d59fc4cc6814df6cd" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="b9fdf37f93cf3baac25d34c66df7cd4e" STYLE="fork">
          <node TEXT="Topic/Subscribe" ID="37eb2d3500bda70e79b80903b7c6252d" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="cc960ac08901ccd026d120923c5d00e3" STYLE="fork"/>
        <node TEXT="demos" ID="cfb3eb1a48609f41b109f7c55f1179d1" STYLE="fork"/>
      </node>
      <node TEXT="/start_move" ID="f24453d0f68694160b3bdc7eb7668bea" STYLE="fork">
        <node TEXT="description" ID="f2366897fb8be6e651915a5baecaf2eb" STYLE="fork">
          <node TEXT="开启运动模式" ID="aa7cc69f6d167d35433c45b590f193a8" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="b26a5ca50820c6a3c01b9a05fcfa0004" STYLE="fork">
          <node TEXT="Topic/Subscribe" ID="af000a46cce01fc503250defa5ea4915" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="9356a65f376b482b2bacff352aaaefe6" STYLE="fork"/>
        <node TEXT="demos" ID="0871f01468e36cdf545a6ecf509c1f57" STYLE="fork"/>
      </node>
      <node TEXT="/body_imu" ID="8866e9e8536697c37ac7dc06414edc92" STYLE="fork">
        <node TEXT="description" ID="bc63822e30cf57c9336e499c99f221eb" STYLE="fork">
          <node TEXT="腰部imu值" ID="d384c1ce46a31dd9204c1295f29b633a" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="930951a22b0f33e5c53bb3de058edad7" STYLE="fork">
          <node TEXT="Topic/Publish" ID="9bb4ab80c6283c4545010b68ea2c5dfb" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="ec6695e2c3c4b6c9118b97aadd64a138" STYLE="fork">
          <node TEXT="sensor_msgs/JointState" ID="da237ac566545039e4f0642263914468" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="8e88021c7443cfe07314cffb87b234e2" STYLE="fork">
          <node TEXT="100" ID="79f6c7547c3c7b8d9cacb73a7922221a" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="2df60dddbdf50d013f67dcb190a37416" STYLE="fork"/>
      </node>
      <node TEXT="/uplimb_occupation" ID="5a4c6af6270735431a1b55b973e0f91a" STYLE="fork">
        <node TEXT="description" ID="13519df7eda448e1c9a693a2685ceb81" STYLE="fork">
          <node TEXT="上肢控制请求" ID="141b657be9e9b86288f4903c7a459bad" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="ba29c86517b7f80b418b7a84df95f4d6" STYLE="fork">
          <node TEXT="Service" ID="31a0aadcb081a1b67ccba12ca75458be" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="a931e16c30c94d9c7a987c4ab7be44e9" STYLE="fork"/>
        <node TEXT="demos" ID="90e3c7640ca611e756afb19da475d423" STYLE="fork"/>
      </node>
      <node TEXT="/versions" ID="ecf84bc97ad18c823adc055dcad24746" STYLE="fork">
        <node TEXT="description" ID="cdfdebce60b801b5ff1fc6698c1720d0" STYLE="fork">
          <node TEXT="上肢模块版本号信息" ID="3fa22d0ddac3511211063073538989a9" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="422a814a2dfcb19a0d720a3c78bce816" STYLE="fork">
          <node TEXT="Service" ID="f1d38c5bd7ec0779f7be2a45b6bd2b04" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="47b93bae160912e4b28378c06556acca" STYLE="fork">
          <node TEXT="software_version, hardware_verion" ID="369a7aa96199f5817334ac5498ee1a3e" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="f1d9e2b27d7cb889ee6bcaa6b785ceb8" STYLE="fork"/>
      </node>
      <node TEXT="/debug_info" ID="9e89523844ad5c6398a8cab531f0730a" STYLE="fork">
        <node TEXT="description" ID="1a466124e919730f8e637c89a696f03d" STYLE="fork">
          <node TEXT="运控模块延时信息" ID="176258ec46eadaa121445786f0415f0f" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="1b550ec44971dcc3eb260be9b6d7b4b0" STYLE="fork">
          <node TEXT="Topic/Publish" ID="82801053c5654bdc4b610f395cc64051" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="2a77101d19b19a85f96fddfc30f622be" STYLE="fork">
          <node TEXT="" ID="b743a43dd26266916597b0fa23927a50" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="f83741f3f2016d113fe25242ae68f2cf" STYLE="fork">
          <node TEXT="1" ID="e822a2ff3839df5b3e525e13cb605f70" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="4b0fd3456dc8a9ec17ee105899910056" STYLE="fork"/>
      </node>
    </node>
    <node TEXT="/sensor" ID="0878fc32a8546b7a7d4ca6fcc50caa80" STYLE="bubble" POSITION="left">
      <node TEXT="/CAM_A" ID="5aa477c037cb5614521f52262c62064b" STYLE="fork">
        <node TEXT="/camera_info" ID="e323c978b07dcf63da1e1495a17aae57" STYLE="fork">
          <node TEXT="description" ID="6f8d7bc9feca1ae3da6b665377d1f661" STYLE="fork">
            <node TEXT="相机A的参数信息,相机A安装在机器人左眼的位置上" ID="13365824ae5484d619468baf201aaa57" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="315067d1b93ce63276ea82a42dd55359" STYLE="fork">
            <node TEXT="Service" ID="451e364fa89aae7be37b29cf838012bb" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="4befae141d5616a371ef0dc54e7ee4e1" STYLE="fork">
            <node TEXT="CameraInfo" ID="d66fb2cd9f52b90957893267b3bd5466" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="ad7ddce310596a062c54f944706fd85f" STYLE="fork">
            <node TEXT="" ID="3f2869232f5e6ba6c18711e7c9ce8731" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="59de9d4846d7075a4be1b9b37b87c8e1" STYLE="fork">
            <node TEXT="相机A的分辨率是多少" ID="a8c8b3a270e629c0af8c25fa94473274" STYLE="fork">
              <node TEXT="回复应包含1280和720" ID="4f18ce27445a7e99df7c9219074cb413" STYLE="fork"/>
            </node>
          </node>
        </node>
        <node TEXT="/image_raw" ID="2c3b5129c2a93b6a65e1d909c5555003" STYLE="fork">
          <node TEXT="description" ID="ed12b0eb08c9c18523bfe0b8e533650e" STYLE="fork">
            <node TEXT="左眼相机的RGB图像源数据" ID="91a542c9e9247aeb6609ed0e18126416" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="62d79feb0a9ebfdb586a3ba93606a557" STYLE="fork">
            <node TEXT="Topic/Publish" ID="e2cc24b64afc25509e72f0a366dd3f47" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="1d0e13a04b2387c4022be8715e5b1af5" STYLE="fork">
            <node TEXT="sensor_msgs/Image" ID="1df8653b737600d28f50d5adaecde5e4" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="4dec9459d6706534a01678ae581ca542" STYLE="fork">
            <node TEXT="16" ID="a25de70bfb4534db17b39ee000eb09a5" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="b441b77f476a9b514d05d664640ee3c6" STYLE="fork">
            <node TEXT="相机A的目前帧率是多少" ID="bbf6d59ca67f9883887a41e1debc1a83" STYLE="fork">
              <node TEXT="回复应接近16" ID="35075a9f5c575014949e1d24fc507170" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="demos" ID="a0781ef794672f2c2bbe919eec472cdf" STYLE="fork">
            <node TEXT="" ID="923104062db0b7b80a9a10343b70ff40" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/compressed" ID="ca634ff94790fa2a82746bb37c191a5f" STYLE="fork">
          <node TEXT="description" ID="921f4d4e929defb24ff918ea62f4f9a8" STYLE="fork">
            <node TEXT="左眼相机的JPG图像数据" ID="cbdb1010f3dbd645e64863f2ae065bec" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="ea147578444826afbee958dc40b7ff9e" STYLE="fork">
            <node TEXT="Topic/Publish" ID="b37eeab43985243c15c5b673f5310e41" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="7c3a255c1bff92451170088a9457925f" STYLE="fork">
            <node TEXT="sensor_msgs/CompressedImage" ID="7e869e580ba74f7046c0c21ac00b69a9" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="5c80e4936da34152c39be12d28e1cf2c" STYLE="fork">
            <node TEXT="16" ID="f4e1fc51afb9ab57ef03e7f26463a5ee" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="6e6ee6a799bf96a1aeaeb481b6ec00a0" STYLE="fork">
            <node TEXT="" ID="74d5ce048c2026153cbbf517ab3badc9" STYLE="fork"/>
          </node>
        </node>
      </node>
      <node TEXT="/CAM_B" ID="74afa7d2755269ea82308400ddac7c12" STYLE="fork">
        <node TEXT="/camera_info" ID="6f23ca1152d3355f5106660893406d71" STYLE="fork">
          <node TEXT="description" ID="888f6249e503a14c667a400f532563f1" STYLE="fork">
            <node TEXT="相机B的参数信息，相机B安装在机器人右眼的位置上" ID="9d1a319aeebbec41163fba1474bdfacb" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="b61fd1da7bd99d0045482f7b1f5c6da1" STYLE="fork">
            <node TEXT="Service" ID="1b2b4ca6e07cf2b5b02ec5623348157b" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="f62c5667e503b2097178d5f9638dacec" STYLE="fork">
            <node TEXT="CameraInfo" ID="0acb7bc7abab10e4e3051cb78cefc01f" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="5ee5cce9607fcf0861c344442cd58675" STYLE="fork"/>
          <node TEXT="agent" ID="59e0cab123cebd04d590c0379ebd541c" STYLE="fork">
            <node TEXT="相机B的分辨率是多少" ID="8bce3f06f9e5738a0789a470eda8a5fa" STYLE="fork">
              <node TEXT="回复应包含1280和720" ID="a3a961ba6eba8910af824dd03bf177a5" STYLE="fork"/>
            </node>
          </node>
        </node>
        <node TEXT="/image_raw" ID="26ca708b43b61ae9a852bb05b666b618" STYLE="fork">
          <node TEXT="description" ID="141e4c1e2ebbdda9cca83be4c128503e" STYLE="fork">
            <node TEXT="右眼相机的RGB图像源数据" ID="1366672fdeb6adf5955b27f0aa74b4d3" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="76f55b24d3af2d7aed19d98dc154f05c" STYLE="fork">
            <node TEXT="Topic/Publish" ID="51155cdf309d2b89587c9a0723eacf7e" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="5a288c571127413308030e5dde6fcec0" STYLE="fork">
            <node TEXT="sensor_msgs/Image" ID="c8fc2c15ecf54cd595a7c26299d2ff14" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="4124f549e927d55a40d234f7d92531d3" STYLE="fork">
            <node TEXT="16" ID="9b713394062acc75b6ad5f545aef5cb5" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="e24c789e8503862e36bae4cfe63b9822" STYLE="fork">
            <node TEXT="相机B的目前帧率是多少" ID="67ba1b91b370781ae2acfeb300320ef5" STYLE="fork">
              <node TEXT="回复应接近16" ID="a345765c63d5cfa12109948dfe2e5a5f" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="demos" ID="0685353d7140f88fafb4ea2f2918a53a" STYLE="fork">
            <node TEXT="" ID="4b7cb6a1e79fb3134dcda660edd490f3" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/compressed" ID="06f40a2561037b8788f260707ce7ec8e" STYLE="fork">
          <node TEXT="description" ID="9116d1eebb82187d34a116c0c0d9c453" STYLE="fork">
            <node TEXT="右眼相机的JPG图像数据" ID="a084c8e7e7770ee87ba41bf6f203a16d" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="1db9c07dc13eaf59304c9bf414898f58" STYLE="fork">
            <node TEXT="Topic/Publish" ID="be975eadd65df946425d1a3c562da3c0" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="d001233b474b114b37562baff7809306" STYLE="fork">
            <node TEXT="sensor_msgs/CompressedImage" ID="ae10c048270ff4301577506085fd4c20" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="c80e7000ab810eda3cf8654d1b706879" STYLE="fork">
            <node TEXT="16" ID="59c15c8bc609ffb95b8e042b919f21d6" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="4245e73759d4f830a117b8152231d4d2" STYLE="fork">
            <node TEXT="" ID="312879272237f8ed236f798f39655253" STYLE="fork"/>
          </node>
        </node>
      </node>
      <node TEXT="/CAM_C" ID="b67ae3085915ebdf88d2c3696533a5f8" STYLE="fork">
        <node TEXT="/camera_info" ID="cd4991151323ef0754e71f20038b111b" STYLE="fork">
          <node TEXT="description" ID="01d6e64a62515594279e5e8527dc67be" STYLE="fork">
            <node TEXT="相机C的参数信息，相机C大致安装在机器人右侧太阳穴的位置上" ID="56af5aaa8282d91d110ee329c5554d05" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="1ed9cc1d971049cef092569c68e299e7" STYLE="fork">
            <node TEXT="Service" ID="e29155a42ac7e6130f698e5d3c08a939" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="64735acd4155f4cb84c51128c5fa276f" STYLE="fork">
            <node TEXT="CameraInfo" ID="5b454b987eaa7eabab9934aa4cfdf1cf" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="89978450689dcb710c3211453817b969" STYLE="fork"/>
          <node TEXT="agent" ID="c947a88f205e13c1974e8ec88c72bdde" STYLE="fork">
            <node TEXT="相机C的目前帧率是多少" ID="40526eb2dc786dcedd82287d260c3bf4" STYLE="fork">
              <node TEXT="回复应接近16" ID="875e59a8c1913fd2b043360322eafb70" STYLE="fork"/>
            </node>
          </node>
        </node>
        <node TEXT="/image_raw" ID="c9de0f220f985451fbcebd3dd39cefe6" STYLE="fork">
          <node TEXT="description" ID="5277df4de20e6155ae110c53954dcde7" STYLE="fork">
            <node TEXT="右侧太阳穴相机C的RGB图像源数据" ID="1ccd6bd4715b861fcfe481aa62a5ecf9" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="e2a6de5329df527744216838440e1cb9" STYLE="fork">
            <node TEXT="Topic/Publish" ID="7b5151b9d5832083fb6d96e6d78ab7c6" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="ceeb9a670fbf4a0159c454f0e08885db" STYLE="fork">
            <node TEXT="sensor_msgs/Image" ID="ba0a64424eddf34e3b69e325603bfb37" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="bfb06db7a4eb6411b032d51219a4c3fc" STYLE="fork">
            <node TEXT="16" ID="9b2713ce89855a7427817e3b2759e79f" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="3ff8d5c8b6d8a388a982ed6218367916" STYLE="fork">
            <node TEXT="相机C的目前帧率是多少" ID="5f30dc89442db8a03b4a0dbafd73c19d" STYLE="fork">
              <node TEXT="回复应接近16" ID="74fe1cacebaaa328590e4eb79ec05ac6" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="demos" ID="60d8d92a34f2817b4e06b5541fabc850" STYLE="fork">
            <node TEXT="" ID="6af1709d0b53ff15bdb43d2b90c88b21" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/compressed" ID="af9c861a55a1771adb2b18a4d12d71e0" STYLE="fork">
          <node TEXT="description" ID="483716cb43fe82a81b9a0f89b4ef917e" STYLE="fork">
            <node TEXT="右侧太阳穴相机C的JPG图像数据" ID="e5b922fcd1137e52bbc6c9961ed64bf0" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="b2bc8ea5cbdaa30fb37860a04e509f03" STYLE="fork">
            <node TEXT="Topic/Publish" ID="89cfce95edea799d45e36c296b0dc38b" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="e1ddced9c56b6de987b3cb03ccdd4c61" STYLE="fork">
            <node TEXT="sensor_msgs/CompressedImage" ID="0dfa469a6544d987ff55ad23d5484da6" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="4cb258bc48b6c5d13341040f0d68bf1e" STYLE="fork">
            <node TEXT="16" ID="ba5f1a268ad4c5c18eb0c93d68ec984d" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="497f95fbf05514af7fb6bb5c0aaaf948" STYLE="fork">
            <node TEXT="" ID="2b6098f41dab58066c27c1c42f10bad5" STYLE="fork"/>
          </node>
        </node>
      </node>
      <node TEXT="/CAM_D" ID="22153581ffdc0df2335c26b53b2e3840" STYLE="fork">
        <node TEXT="/camera_info" ID="aa8abf6e0fb3178b057da29ff6f71f78" STYLE="fork">
          <node TEXT="description" ID="578a01c805150ecc6131bc33288c8d91" STYLE="fork">
            <node TEXT="左侧太阳穴相机D的参数信息" ID="07a8930b0b19fcfcf2960b127274b889" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="8035e3cbf7cd370594f79d6c66e69cf7" STYLE="fork">
            <node TEXT="Service" ID="35765875e0e4b08f2fae925d7e0a3bcb" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="6d9bdd7529e7c4b6ccb9387276754589" STYLE="fork">
            <node TEXT="CameraInfo" ID="ec4d20527356862766b6be3da84f8a98" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="564f39e4a2d4433b2116d0d73a68b459" STYLE="fork"/>
          <node TEXT="agent" ID="7585d744e11627fcaa6f235ef32ef694" STYLE="fork">
            <node TEXT="相机D的目前帧率是多少" ID="4975ce99c429fc59c2f72bb94afdd823" STYLE="fork">
              <node TEXT="回复应接近16" ID="f300bc626069fc6574f290014c36b02d" STYLE="fork"/>
            </node>
          </node>
        </node>
        <node TEXT="/image_raw" ID="5a9771d279868bcbd76689b2f36ea2cc" STYLE="fork">
          <node TEXT="description" ID="43718b991116a32705fe4a2fcc47733a" STYLE="fork">
            <node TEXT="左侧太阳穴相机D的RGB图像源数据" ID="11a15b6831af64734830be91aac1729f" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="d559fcd43408d23f4d1ff169287c7704" STYLE="fork">
            <node TEXT="Topic/Publish" ID="681256f1caf7b95b2bf09c34a2261df7" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="e760258526f72ed42e4cabd1c41c4953" STYLE="fork">
            <node TEXT="sensor_msgs/Image" ID="b74bd42fbcf8ad1c4839314109fb14e1" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="a8461c18301d725c924cd205e8be5bfe" STYLE="fork">
            <node TEXT="16" ID="48f64a1fc450c1df30eab1c9b88f0fa5" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="69c45c5fda937acdc4f4888c7b825ada" STYLE="fork">
            <node TEXT="相机D的目前帧率是多少" ID="2e25bf23cb08f5e5cfeaef221f6b1220" STYLE="fork">
              <node TEXT="回复应接近16" ID="461c8642b44217babbfa4db43d722d72" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="demos" ID="8d9612a5504ef481c0acc34d86f82e67" STYLE="fork">
            <node TEXT="" ID="fbd3addcee3c7867c8ed26a177605bfe" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/compressed" ID="5bdee1dc21315cca0026ad80a0dd2a9c" STYLE="fork">
          <node TEXT="description" ID="d3ad5cda9ae25bcb64f712ea93657dd4" STYLE="fork">
            <node TEXT="左侧太阳穴相机D的JPG图像格式" ID="d4fb8dcc77706da62a0878dd6e731fda" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="42c9c8785f936814359ec80707fa465e" STYLE="fork">
            <node TEXT="Topic/Publish" ID="efb4397ba4b0b9414239562239302ef5" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="7ed7c911a1efacefcff7d695414f8289" STYLE="fork">
            <node TEXT="sensor_msgs/CompressedImage" ID="0ec88a02206bc62023bcf7b379bf6024" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="669e5f7aed3cdd28845ea4f26beaf91c" STYLE="fork">
            <node TEXT="16" ID="9ac92ae798a2032f63f40494301832ea" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="a00e724a274046b0dba6c444f3fe331d" STYLE="fork">
            <node TEXT="" ID="5d14297f7d02692a8bef9559b4ba4584" STYLE="fork"/>
          </node>
        </node>
      </node>
      <node TEXT="/head_imu" ID="c48eead3051726c9d138bcfc2e9fa83c" STYLE="fork">
        <node TEXT="description" ID="f90d27bf38b4548f7b408f45ad42b3f8" STYLE="fork">
          <node TEXT="头部相机的IMU数据" ID="0468d88cddda334c663086454bdc386d" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="d67c951ac8e253f2a05938537c01c6f2" STYLE="fork">
          <node TEXT="Topic/Publish" ID="6747ce290cac68d0b970e7772747c1fc" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="bf4a648f3e7a47a0ef4f406ddab45d7a" STYLE="fork">
          <node TEXT="sensor_msgs/Imu" ID="485cc26995638b5fdfb52601ccc73d89" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="a85b39148acbbf9d735e073b8dc696cb" STYLE="fork">
          <node TEXT="100" ID="923bb9af7fbb879896703f8155dd4bbd" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="40cd197c2e9ea288785508c47d38bc85" STYLE="fork">
          <node TEXT="头部IMU的目前帧率是多少" ID="bf38350cf12347379f814855ce49f322" STYLE="fork">
            <node TEXT="回复应接近100" ID="8065f876d3e8bd01b1f8240aefbec7dd" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="demos" ID="ec5fa290d4c0b5afbdd7b1c9e4ae9160" STYLE="fork"/>
      </node>
      <node TEXT="/realsense_up" ID="f256609a6d9533d32b653f312a52b888" STYLE="fork">
        <node TEXT="/aligned_depth_to_color" ID="cd350bad972e1ee5e8d7d53f1a3488bc" STYLE="fork">
          <node TEXT="/camera_info" ID="e9cf3baf83fbb1fe91dd2dfc6c8b04c8" STYLE="fork">
            <node TEXT="description" ID="c324f3cafe6db5150a7a9c159be3ccb5" STYLE="fork">
              <node TEXT="胸部深度相机的参数信息" ID="c10126d6c5e7822fde5d97880dfe7b88" STYLE="fork"/>
            </node>
            <node TEXT="type" ID="686a6b365603a6338f424963388e2aaf" STYLE="fork">
              <node TEXT="Topic/Publish" ID="6481a323fa55e364755ab0244eafffda" STYLE="fork"/>
            </node>
            <node TEXT="msg_type" ID="86cf47258a6bd881cbbf44c8048e887c" STYLE="fork">
              <node TEXT="sensor_msgs/CameraInfo" ID="974459f6e818a8d6fdab1a1a18ad3dfa" STYLE="fork"/>
            </node>
            <node TEXT="hz" ID="88f2cde7e2e7f7475cbcac8193bc51e8" STYLE="fork">
              <node TEXT="30" ID="ec9bb22c47a7f9d9800406530941774e" STYLE="fork"/>
            </node>
            <node TEXT="demos" ID="ce95e6e9965d6b41ae77fb79329d47da" STYLE="fork"/>
          </node>
          <node TEXT="/image_raw" ID="ce27d8398790f65c5bd5af731d1526fb" STYLE="fork">
            <node TEXT="description" ID="d00e655083784ad6c410557d1db0e87e" STYLE="fork">
              <node TEXT="胸部深度相机的RGB图像源数据" ID="e3e099feb748050c28314e05b8dddda1" STYLE="fork"/>
            </node>
            <node TEXT="type" ID="7198e5662c84eda812957f7dae10c50f" STYLE="fork">
              <node TEXT="Topic/Publish" ID="4b0caae0de68704794296beec500fea0" STYLE="fork"/>
            </node>
            <node TEXT="msg_type" ID="785e4aaf14f8af81694b593d5c9c22f9" STYLE="fork">
              <node TEXT="sensor_msgs/Image" ID="838e311cb09be29d60d1c5f1e3a1073e" STYLE="fork"/>
            </node>
            <node TEXT="hz" ID="4c6d350a70bcbb48bd048f540b7bcdca" STYLE="fork">
              <node TEXT="30" ID="dcbef4659121e634160b34a3f5d3eb2b" STYLE="fork"/>
            </node>
            <node TEXT="demos" ID="955bca0de83a17ee6a372c5ca7e61ac4" STYLE="fork">
              <node TEXT="" ID="1407b984d10c705dd2fadc44634f0b1f" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="/image_raw" ID="91b1229352ae02c7844dd195d9979bbf" STYLE="fork">
            <node TEXT="/compressed" ID="a7a933ddef21a73a9c547099d1b73411" STYLE="fork">
              <node TEXT="description" ID="cd406a507aea101adc20b3e40df3211d" STYLE="fork">
                <node TEXT="胸部深度相机的RGB图像JPG格式" ID="df4d45e780626721d02d8d4d883e8c8b" STYLE="fork"/>
              </node>
              <node TEXT="type" ID="286e79e959877c9d7cd893aa80b1ab7d" STYLE="fork">
                <node TEXT="Topic/Publish" ID="87b03277f96f81400fb6c5785653dce4" STYLE="fork"/>
              </node>
              <node TEXT="msg_type" ID="6a6b5da2a4290e7094932de2bcb40895" STYLE="fork">
                <node TEXT="sensor_msgs/Image" ID="bd13c642bb423ab72c0340203b563b04" STYLE="fork"/>
              </node>
              <node TEXT="hz" ID="dfd26cf727971e26b4c6bffb1665cbb1" STYLE="fork">
                <node TEXT="30" ID="07e237ed449567908c3ad7efb69afd79" STYLE="fork"/>
              </node>
              <node TEXT="demos" ID="ea84a442669c046c4a5f559eaff1dbca" STYLE="fork">
                <node TEXT="" ID="f8bf2677be41ee98ff2d984dfe476ac0" STYLE="fork"/>
              </node>
            </node>
          </node>
        </node>
        <node TEXT="/color" ID="e50223cfd09f725c32b6ded7a54cf315" STYLE="fork">
          <node TEXT="/camera_info" ID="f10d9edf9868cd5666f593a07dd43bb6" STYLE="fork">
            <node TEXT="description" ID="cb05aff15b0e43dde7a94baad6a7c9ad" STYLE="fork">
              <node TEXT="胸部深度相机的参数信息" ID="91b77c28c7d8e2e0d4fbe36d32392d4f" STYLE="fork"/>
            </node>
            <node TEXT="type" ID="6ccaaca73f2128d04b9bfcb5b3842578" STYLE="fork">
              <node TEXT="Topic/Publish" ID="3c5c05a261124d1fed95a4806762e3cb" STYLE="fork"/>
            </node>
            <node TEXT="msg_type" ID="fe384a1a0ecc88d701e0c18857a12183" STYLE="fork">
              <node TEXT="sensor_msgs/CameraInfo" ID="82302bab909fb4f3f4a2ec30484a1308" STYLE="fork"/>
            </node>
            <node TEXT="hz" ID="0cbe06c02c5c377dc752b2b889502d3a" STYLE="fork">
              <node TEXT="30" ID="a6498b4dcb4ce56ed89f688bed4777ba" STYLE="fork"/>
            </node>
            <node TEXT="demos" ID="81f4322ff4eca174dd1fdc2ac01055ae" STYLE="fork"/>
          </node>
          <node TEXT="/image_raw" ID="c2085595b797be69bfa914b7da45c47c" STYLE="fork">
            <node TEXT="description" ID="ff03702ec97574ae878889f9f8e7c2d8" STYLE="fork">
              <node TEXT="胸部深度相机的RGB图像源数据" ID="eed5df307327f3aba72c16db064126df" STYLE="fork"/>
            </node>
            <node TEXT="type" ID="b088a3db2c1979f06d6d82654ec0546a" STYLE="fork">
              <node TEXT="Topic/Publish" ID="843b1629c6252eaf1196d11ea2c708b0" STYLE="fork"/>
            </node>
            <node TEXT="msg_type" ID="a626e4b09cff14261b625162b13b4369" STYLE="fork">
              <node TEXT="sensor_msgs/Image" ID="b9454c46cbd1e9e84effc38f1070b44d" STYLE="fork"/>
            </node>
            <node TEXT="hz" ID="0b28f86a4c91cf8a8655f743b9049343" STYLE="fork">
              <node TEXT="30" ID="01a4794831cfb88447444f605cdc8a12" STYLE="fork"/>
            </node>
            <node TEXT="/compressed" ID="425ac15c96372dc26c4d311be37f93a2" STYLE="fork">
              <node TEXT="description" ID="83c70530d480bff31f78cd95fe4ad481" STYLE="fork">
                <node TEXT="胸部深度相机的RGB图像JPG格式" ID="c98547387a770a767fbcac6d2da43a29" STYLE="fork"/>
              </node>
              <node TEXT="type" ID="7f1eb58509740e551289a3b3c1d79d6c" STYLE="fork">
                <node TEXT="Topic/Publish" ID="7344400a04a1f3ea5837a581c9280be5" STYLE="fork"/>
              </node>
              <node TEXT="msg_type" ID="13ac7b55b17a5a5932e2c0a1831da8f7" STYLE="fork">
                <node TEXT="sensor_msgs/Image" ID="f28c41ca4c05539761237dd1914ac5d7" STYLE="fork"/>
              </node>
              <node TEXT="hz" ID="19d3ad8ce1262f8078c9823d48aba874" STYLE="fork">
                <node TEXT="30" ID="e8b38318aa6791655f175bb66d7e3b47" STYLE="fork"/>
              </node>
            </node>
            <node TEXT="demos" ID="0fe5a0905208a779cc689d4a8e45969c" STYLE="fork">
              <node TEXT="" ID="36a6e8bb9cf39c7bb1c2b8130b3f0cec" STYLE="fork"/>
            </node>
          </node>
        </node>
        <node TEXT="/depth" ID="ce2c72af0e1329117d8a4deb56a29290" STYLE="fork">
          <node TEXT="/camera_info" ID="90c7ea9b73ebe29487ac08d4b9780290" STYLE="fork">
            <node TEXT="description" ID="f6224d7c7108b51a05a8d1c1c7cbd332" STYLE="fork">
              <node TEXT="胸部深度相机的参数信息" ID="8cf39214d2f36a9116a659935972ffbb" STYLE="fork"/>
            </node>
            <node TEXT="type" ID="e616a660a86f83ca102b0d12aa063c05" STYLE="fork">
              <node TEXT="Topic/Publish" ID="a32225777a510d72636fd7fa5e638715" STYLE="fork"/>
            </node>
            <node TEXT="msg_type" ID="a0786da007a5c1e393db76c98d63bf81" STYLE="fork">
              <node TEXT="sensor_msgs/CameraInfo" ID="778d59649d30a81ca0e3f2f5633dfce6" STYLE="fork"/>
            </node>
            <node TEXT="hz" ID="8e0ea15909e0c84a5aaf35a4286e3542" STYLE="fork">
              <node TEXT="30" ID="127804f2c34c7c246cc7d92a284434d0" STYLE="fork"/>
            </node>
            <node TEXT="demos" ID="e30c4db14dd8406589356596e7cf07e2" STYLE="fork"/>
          </node>
          <node TEXT="/image_raw" ID="eba320b2938773e3f708d51f8911e942" STYLE="fork">
            <node TEXT="description" ID="4345c741a8588c9f05ec3914d432c091" STYLE="fork">
              <node TEXT="胸部深度相机的RGB图像源数据" ID="7059097dd0a817ee928f0e7f08b27eca" STYLE="fork"/>
            </node>
            <node TEXT="type" ID="46e84715adb8a0867b575cb2ea6be409" STYLE="fork">
              <node TEXT="Topic/Publish" ID="964320f4608f9c3e0be78ae25654f68e" STYLE="fork"/>
            </node>
            <node TEXT="msg_type" ID="392009ba6dabd7bdfcfc588e81a2e70a" STYLE="fork">
              <node TEXT="sensor_msgs/Image" ID="7907335836298b17f28574e2b55fee08" STYLE="fork"/>
            </node>
            <node TEXT="hz" ID="0b0e54fe9ce0ae272a7862f23a25c1fb" STYLE="fork">
              <node TEXT="30" ID="61070c494f25642a29d6634b499c9124" STYLE="fork"/>
            </node>
            <node TEXT="/compressed" ID="a8f1747871cbdd1ae43ebb19ada90825" STYLE="fork">
              <node TEXT="description" ID="259d5e0255af4e971966bbd51995e311" STYLE="fork">
                <node TEXT="胸部深度相机的RGB图像JPG格式" ID="702326f8d135df7fe965ffa05fccd0bf" STYLE="fork"/>
              </node>
              <node TEXT="type" ID="a62031a39d596595ee944f7b1a8f60b0" STYLE="fork">
                <node TEXT="Topic/Publish" ID="28ffd1e11b617f47eb4dd32b940ad5b6" STYLE="fork"/>
              </node>
              <node TEXT="msg_type" ID="87d3a40b3cec176781b82beb6bb8c1a0" STYLE="fork">
                <node TEXT="sensor_msgs/Image" ID="a6ef8fdae63e316ec48ff96e6b4644ee" STYLE="fork"/>
              </node>
              <node TEXT="hz" ID="9661ed4a91e09e74ce3cd2d1369cdaf6" STYLE="fork">
                <node TEXT="30" ID="5f42e1714d290275faccd1e20ecd8721" STYLE="fork"/>
              </node>
            </node>
            <node TEXT="demos" ID="6be4563c691b06397500d28d5f1e91b6" STYLE="fork">
              <node TEXT="" ID="50b65114f223df491efda88c33504400" STYLE="fork"/>
            </node>
          </node>
        </node>
      </node>
      <node TEXT="/realsense_down" ID="42246453a0e5d1b7e6dfb126a0df9919" STYLE="fork">
        <node TEXT="/aligned_depth_to_color" ID="632d8126c525d13a0cfa2b1a6cf7fa9e" STYLE="fork">
          <node TEXT="/camera_info" ID="1d87d38c57786f6eec1c6c559fcd4543" STYLE="fork">
            <node TEXT="description" ID="3163b1312fdb503d521b087eefa7a5ed" STYLE="fork">
              <node TEXT="胸部深度相机的参数信息" ID="f3084568840ed3db468a15db417f4a2e" STYLE="fork"/>
            </node>
            <node TEXT="type" ID="c71a54acf93cbe053e6618367bfbcc04" STYLE="fork">
              <node TEXT="Topic/Publish" ID="fcec608be278166a1a190f8b78c8d045" STYLE="fork"/>
            </node>
            <node TEXT="msg" ID="3151a60d15f5000b05391885bb129799" STYLE="fork">
              <node TEXT="sensor_msgs/CameraInfo" ID="035ad9f6df44374696cdc2aa25d99580" STYLE="fork"/>
            </node>
            <node TEXT="hz" ID="26a0f95970637c1c32b9cf2c922a1d15" STYLE="fork">
              <node TEXT="30" ID="13ba312ab766419242737766563b5bf7" STYLE="fork"/>
            </node>
            <node TEXT="demos" ID="d7fa17c348758db722198f6e3ba2968f" STYLE="fork"/>
          </node>
          <node TEXT="/image_raw" ID="7d91bbb1f63cbdbdd47607ce4291eb46" STYLE="fork">
            <node TEXT="description" ID="fdb5a7d8dd3b88490e2b7f6283a25efd" STYLE="fork">
              <node TEXT="胸部深度相机的RGB图像源数据" ID="58a7d7dc04cdd89dda060101d346810b" STYLE="fork"/>
            </node>
            <node TEXT="type" ID="921eb2806ae779ad00d90a4ff6dedb3f" STYLE="fork">
              <node TEXT="Topic/Publish" ID="0a0591de3bc51b4853613c23105ef709" STYLE="fork"/>
            </node>
            <node TEXT="msg" ID="0ceaf94e8568339d11a421197106d3c7" STYLE="fork">
              <node TEXT="sensor_msgs/Image" ID="d81ce6f83900a3989594a87c1e07f7e3" STYLE="fork"/>
            </node>
            <node TEXT="hz" ID="f8c9c1c26483611431719d2364aad81b" STYLE="fork">
              <node TEXT="30" ID="df15abf0d32a18cd816e7e46b1c2b23e" STYLE="fork"/>
            </node>
            <node TEXT="demos" ID="f898105ad1f8e0837cdf826dffe7745b" STYLE="fork">
              <node TEXT="" ID="0fc4b9f2d1a3a3d38cc1d2b9f6dab329" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="/image_raw" ID="7da7bd2ed095f849f9016582f870bc9e" STYLE="fork">
            <node TEXT="/compressed" ID="663ca774ebc80225a4e003360eda9836" STYLE="fork">
              <node TEXT="description" ID="3abce1f3e3389c82fa45ec3134ba55e7" STYLE="fork">
                <node TEXT="胸部深度相机的RGB图像JPG格式" ID="b1f734f23f4185120c136ef30dd68a5d" STYLE="fork"/>
              </node>
              <node TEXT="type" ID="39544cc83a1793d8e402c3a4e6338c94" STYLE="fork">
                <node TEXT="Topic/Publish" ID="ee41efd7cdd2fe0a3f1d7c847bb89ab0" STYLE="fork"/>
              </node>
              <node TEXT="msg" ID="e5f2c84c3c29237860f00237495898ef" STYLE="fork">
                <node TEXT="sensor_msgs/Image" ID="176a1305b3e52f0713c8001628691230" STYLE="fork"/>
              </node>
              <node TEXT="hz" ID="cb9eb6187a4ba4c8f145bd24491504a6" STYLE="fork">
                <node TEXT="30" ID="5b88ac37b530577e48b74d49176b04d3" STYLE="fork"/>
              </node>
              <node TEXT="demos" ID="bf5ac99fe7f6a14e9bb68dd90f9c4622" STYLE="fork">
                <node TEXT="" ID="37cc8652cf6169dce6f5c04474a50ff1" STYLE="fork"/>
              </node>
            </node>
          </node>
        </node>
        <node TEXT="/color" ID="4d8b6e48fed6574da8d19902ea39f7ba" STYLE="fork">
          <node TEXT="/camera_info" ID="65ab3e6f9d628715e06fb4e05ee442c8" STYLE="fork">
            <node TEXT="description" ID="076529f40e91e411dddbf82d513fce3c" STYLE="fork">
              <node TEXT="胸部深度相机的参数信息" ID="5fb100853abb2287d71c1b608e80e5f9" STYLE="fork"/>
            </node>
            <node TEXT="type" ID="6e2bf8345ecf5c680576767d722148d4" STYLE="fork">
              <node TEXT="Topic/Publish" ID="fdcda2dcdce9ce3f051524a007cb634b" STYLE="fork"/>
            </node>
            <node TEXT="msg_type" ID="3d29539b43bb51735cae6c61311dfeae" STYLE="fork">
              <node TEXT="sensor_msgs/CameraInfo" ID="cbeb85dc806ae08942f71c69102eecc2" STYLE="fork"/>
            </node>
            <node TEXT="hz" ID="5bd30ac9d755f9cf53664becff226333" STYLE="fork">
              <node TEXT="30" ID="3b69ff01b5e6397a2d188d0b87d78b59" STYLE="fork"/>
            </node>
            <node TEXT="demos" ID="8e4fdc546b0872f165146950c801dc6a" STYLE="fork"/>
          </node>
          <node TEXT="/image_raw" ID="24a517568f781c01bfd8e9fdaf3e6644" STYLE="fork">
            <node TEXT="description" ID="2a32a232006a5197c9e2a5184509f2e5" STYLE="fork">
              <node TEXT="胸部深度相机的RGB图像源数据" ID="1d5e2f0d6ce3a2b37736a8d126814635" STYLE="fork"/>
            </node>
            <node TEXT="type" ID="da1875b7580ac47c3b139d84da08d11e" STYLE="fork">
              <node TEXT="Topic/Publish" ID="e11565d156aedfeb06868e9511d384fa" STYLE="fork"/>
            </node>
            <node TEXT="msg_type" ID="ed0c932678a7ac478d3ecb01e8fb7440" STYLE="fork">
              <node TEXT="sensor_msgs/Image" ID="12fca0aa487a02cb928d6c5e1ce3c8e3" STYLE="fork"/>
            </node>
            <node TEXT="hz" ID="3e6c77559d192a506ee9a7276e29ac1e" STYLE="fork">
              <node TEXT="30" ID="225350ac115d4e3c6fbe4c68ced2f723" STYLE="fork"/>
            </node>
            <node TEXT="demos" ID="60598d7603d040ccc5ebc866a3013161" STYLE="fork">
              <node TEXT="" ID="91ccab5110a0c24f2e1b86aaa9d65ee1" STYLE="fork"/>
            </node>
            <node TEXT="/compressed" ID="1cfab831397c455bdf227092d8e52e81" STYLE="fork">
              <node TEXT="description" ID="4db409663ca94c66be9ec0111b39bbc6" STYLE="fork">
                <node TEXT="胸部深度相机的RGB图像JPG格式" ID="8774f501673b95863593da08db4c7fb9" STYLE="fork"/>
              </node>
              <node TEXT="type" ID="4d4332d5e47ba78ff253c4f46129a0c1" STYLE="fork">
                <node TEXT="Topic/Publish" ID="4dbdcab452b77314f83ca66b1af85e77" STYLE="fork"/>
              </node>
              <node TEXT="msg_type" ID="122bc6a88963052c3bd03cd5b4fb4d47" STYLE="fork">
                <node TEXT="sensor_msgs/Image" ID="8e24ce85159e75e4448d5189670925fe" STYLE="fork"/>
              </node>
              <node TEXT="hz" ID="64fdedf55227c3774183bd14b1e459b3" STYLE="fork">
                <node TEXT="30" ID="070ad51d5cf0673c141bfc292b6db3b4" STYLE="fork"/>
              </node>
              <node TEXT="demos" ID="febcfb57757ab847d564a4115f144c2e" STYLE="fork">
                <node TEXT="" ID="2de3ee03fe339a79d7499d2b128b29a2" STYLE="fork"/>
              </node>
            </node>
          </node>
        </node>
        <node TEXT="/depth" ID="20200d03ed8ad27c058409dcec35106c" STYLE="fork">
          <node TEXT="/camera_info" ID="e27b471adb4d80c55c9295f2e7e38726" STYLE="fork">
            <node TEXT="description" ID="21da02d919b3b33104d7560165577afd" STYLE="fork">
              <node TEXT="胸部深度相机的参数信息" ID="8d0e7caf386f298bd7be638eecc848aa" STYLE="fork"/>
            </node>
            <node TEXT="type" ID="c82fb9df10824fbc68ccd6b5beb84ea5" STYLE="fork">
              <node TEXT="Topic/Publish" ID="7ac04ee4b413e9a7c1cd9376c19c43e3" STYLE="fork"/>
            </node>
            <node TEXT="msg_type" ID="40b7fe688db4b3dcf0927d4482b6dee5" STYLE="fork">
              <node TEXT="sensor_msgs/CameraInfo" ID="5a2eae737c369a7005ba8f0db752426b" STYLE="fork"/>
            </node>
            <node TEXT="hz" ID="a7817180c161bb0c19bb3f2b64f251ed" STYLE="fork">
              <node TEXT="30" ID="cb0b646c724bf3adfb236117c4a5ac34" STYLE="fork"/>
            </node>
            <node TEXT="demos" ID="c9f45e3aabbdb7154c638e7245f23c6a" STYLE="fork"/>
          </node>
          <node TEXT="/image_raw" ID="598a3fc9f7357bfbb61326679044398b" STYLE="fork">
            <node TEXT="description" ID="54550630911a089aaa2474d226869529" STYLE="fork">
              <node TEXT="胸部深度相机的RGB图像源数据" ID="ccd58dcc1c3758650a5ccadf4e1866f4" STYLE="fork"/>
            </node>
            <node TEXT="type" ID="0e41542a90d0881cb8164da8dd38d402" STYLE="fork">
              <node TEXT="Topic/Publish" ID="e0cd194b225e528c2f26192467d67ef1" STYLE="fork"/>
            </node>
            <node TEXT="msg_type" ID="b4fd077dfbe9e822096d7f6d840a2feb" STYLE="fork">
              <node TEXT="sensor_msgs/Image" ID="69e2210b497018e751c528921f24bbff" STYLE="fork"/>
            </node>
            <node TEXT="hz" ID="7f72acb80851d1231522ffea7a003315" STYLE="fork">
              <node TEXT="30" ID="e04485332a79ed8b20394f85b4e4174f" STYLE="fork"/>
            </node>
            <node TEXT="demos" ID="6b0ff38c7f63bb0940c26067e6b667a8" STYLE="fork">
              <node TEXT="" ID="868e6464d290fe2d72b6a92017e88525" STYLE="fork"/>
            </node>
            <node TEXT="/compressed" ID="1d5b5934370a37d3aa7c286075828779" STYLE="fork">
              <node TEXT="description" ID="f81252e816f4b70859fe8eaf5ed71512" STYLE="fork">
                <node TEXT="胸部深度相机的RGB图像JPG格式" ID="9fc8d8a2b340d7bfc6286337b186e797" STYLE="fork"/>
              </node>
              <node TEXT="type" ID="81f64ce971e79dad3dd10d13c1e60656" STYLE="fork">
                <node TEXT="Topic/Publish" ID="aadc806e97764bf96452c919320764d6" STYLE="fork"/>
              </node>
              <node TEXT="msg_type" ID="9dfbdf86c7af256f0c37838bc2c45cf2" STYLE="fork">
                <node TEXT="sensor_msgs/Image" ID="e004d559c1607eb5e51918868a80a11e" STYLE="fork"/>
              </node>
              <node TEXT="hz" ID="100fe672e7d1974d1d4c11bef2c00556" STYLE="fork">
                <node TEXT="30" ID="067e5064e8ee068ddd67c1e76a0c0166" STYLE="fork"/>
              </node>
              <node TEXT="demos" ID="63cfb5f7e1060df62f447cf565f9d608" STYLE="fork">
                <node TEXT="" ID="d190ea9d99ddcfcca6c1d5a41f85bdd8" STYLE="fork"/>
              </node>
            </node>
          </node>
        </node>
      </node>
    </node>
    <node TEXT="/manipulate" ID="7ac2d838071e5524ffee055d957b514e" STYLE="bubble" POSITION="left">
      <node TEXT="/scene_update" ID="6c8c3e9e3dbf024a50016155fbccc423" STYLE="fork">
        <node TEXT="description" ID="34501f30fd0b1296bfbc2ca67eeb5f1e" STYLE="fork">
          <node TEXT="机器人场景更新,基于二维码，需要场景中有二维码" ID="248657b54dc9e75b45ffaba1033a046f" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="9bd6a25a2c7d5682368dbe0fd4e77ae6" STYLE="fork">
          <node TEXT="Service" ID="94d91cf424b5fce03ea5575df450eb00" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="8fef2c49586c6080e5d77587886f9635" STYLE="fork">
          <node TEXT="SceneUpdate" ID="c9156145f63587f96f69c73e95bf8d94" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="023d12dd6cec98d51b0a2373a70dd0e4" STYLE="fork">
          <node TEXT="naviai_manip_scene_update_client.py" ID="4e0aad5b08c6a710617acd2aff453bab" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="02751f6195986afea2162ab91ee4e865" STYLE="fork">
          <node TEXT="机器人抓取物品前的环境感知" ID="1d40cf425c68af00f6c20f562ac63c99" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/joint_space_trajectory_planner" ID="173f6828ffeaef8cdc4d3f1d2ba40644" STYLE="fork">
        <node TEXT="description" ID="1c776961f63025322f5f580887744141" STYLE="fork">
          <node TEXT="关节空间轨迹规划，输出关节轨迹" ID="0ae8ff4be8f16da21c5d2251635750e3" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="b02caa9866677c1012b76ab7106dda3a" STYLE="fork">
          <node TEXT="Service" ID="ba034bc87b7da46d766f7fcc2c1440ba" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="09edd361520c7c18b3bc7b3441242bdf" STYLE="fork">
          <node TEXT="GetTrajectory" ID="7021e95c8cc2d1c546af25370db75ee7" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="8034a09be2308b9a8ee70c5226063574" STYLE="fork">
          <node TEXT="trajectory_plan_client.py" ID="c8aed06f1cd355eb3694c3083e6cec2d" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="88052969e6f9f67b3d651bdefb2d393a" STYLE="fork">
          <node TEXT="示教模式下记录各个关节数据，据此生成完整的执行轨迹" ID="381cc48231be434dcecda60dc4ef6134" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/pose_space_trajectory_planner" ID="b42f424159e97e982f2996cc5e8b5b44" STYLE="fork">
        <node TEXT="description" ID="c99c5e6ff1df452212642453afac3a1f" STYLE="fork">
          <node TEXT="末端空间轨迹规划" ID="80353fdcd67484a8f0af003865e41dd1" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="72b68558ebc8c3ee3e3e0d0e18570df7" STYLE="fork">
          <node TEXT="Service" ID="7ce2db0db28599614248030d988b4b24" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="9a58e5264e5d671c5fb2aa2f8b700987" STYLE="fork">
          <node TEXT="MotionPlan" ID="45007869558dd6890127efce29617dae" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="1d5f207c74e59c8fe47e75be53f07ae9" STYLE="fork">
          <node TEXT="naviai_manip_motion_plan_client.py" ID="836a05ed5e28dcafd129ccfb7f10a80b" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="50aa1939c70ce00eeaa65c3f0a5c9444" STYLE="fork">
          <node TEXT="示教模式下记录各个末端执行器数据，据此生成完整的执行轨迹" ID="9dd6731a85f14c02e538e68603d40533" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/camera_calibration" ID="610dab2ef72d46d174cc176f8deac842" STYLE="fork">
        <node TEXT="description" ID="d1032f7e4ef2e69d7ad35c875e644b4d" STYLE="fork">
          <node TEXT="相机内外参标定" ID="21478c56f388f3397ea6147c5c000f77" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="606e67970231e7e2db9aa3a1846f7e2e" STYLE="fork">
          <node TEXT="Service" ID="6576d5a15aed4ae93457252881d1cb42" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="6bc543b41f67676c310b59d10c1416e9" STYLE="fork">
          <node TEXT="CameraCalibration" ID="9ab13ab0e9bbbc420049e6ed5a643a40" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="9c901371ad2e379a12851d30e81bb43c" STYLE="fork">
          <node TEXT="自动相机内外参标定，外参标定时机器人会执行一段轨迹，拍摄不同角度的照片，从而计算外参" ID="b076b4f32d86a5333caef63b0688a5df" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="34a416969c7a2dcc2d610fd4a89611d5" STYLE="fork"/>
      </node>
      <node TEXT="/grasp_teach_service" ID="132163dfbf746a4cec8a5498a36466fd" STYLE="fork">
        <node TEXT="description" ID="bc08880f15c38b47b95c18d9824a2b5e" STYLE="fork">
          <node TEXT="视觉抓取示教服务" ID="8e56b5a481288c3f2b096dd2a09fd416" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="dd7f6ed3ce226536607d3ab275410269" STYLE="fork">
          <node TEXT="Service" ID="bc8957beddb863b59b22212c8f7c4da8" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="93ae2f816986b0db7fcb10ff0ad73a75" STYLE="fork">
          <node TEXT="GraspTeach" ID="d115a71b8374926054c05df382122a92" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="e4db239492a5449eadd04712be2ec8d5" STYLE="fork">
          <node TEXT="视觉示教抓取，让机器人知道该从什么方位抓取物品" ID="421df9b756ca505edf8518d6bfd5a901" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="f1f2350cb5cbac9d2a180d7e89e3c467" STYLE="fork"/>
      </node>
      <node TEXT="/pose_estimation_service" ID="98dd34355b72483e0eebce56996078f4" STYLE="fork">
        <node TEXT="description" ID="6d389bcd502c6e80edb0d1b81b798be3" STYLE="fork">
          <node TEXT="获取目标物体位姿" ID="c1bb32357658a043fee3eaaf099b1fc7" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="20659c79ec82113913e150d9bfe1cbaa" STYLE="fork">
          <node TEXT="Service" ID="d2ce7da57f50f2a46e68764524cb7e19" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="b06da4b0661d65392d1c4156d1dba39e" STYLE="fork">
          <node TEXT="PoseEst" ID="6150eaf4496fd230bed461a4d2b7e172" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="d9fc75a5a681b72895b4346aa52f87ce" STYLE="fork">
          <node TEXT="pose_estimator_client.py" ID="eb4fbe2ba0e7192cbf423fbc1eeda380" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="3b4c038174565799b3cc50e941370dc2" STYLE="fork">
          <node TEXT="输入图像获取指定物品的6D位姿" ID="9c5747890e54aa3eeee632cc2a7580b7" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/instance_segmentation_service" ID="75cb1b4668fb1469f50a74fbb210f09e" STYLE="fork">
        <node TEXT="description" ID="de527c499801aeddfb72360407288f62" STYLE="fork">
          <node TEXT="实例分割服务" ID="bf93cb871622a86b56f5af891743bdb5" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="ceeeffe9b0bce5ec1f66615898434bba" STYLE="fork">
          <node TEXT="Service" ID="291bbe79acbc349ea4088745c96f6c4c" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="f1d69091c9bcb51fd9b6588b89843237" STYLE="fork">
          <node TEXT="InstSeg" ID="04ab4f7d76caa1a8fe0dd0621d379cb3" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="0be90d4ea23070b537977b583a0d397b" STYLE="fork">
          <node TEXT="seg_pre_service_client.py" ID="6e107e8692ad3037f199b10d6c898eca" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="ace0dd5a190ade909d0fd4d4192c834a" STYLE="fork">
          <node TEXT="输入图像获取指定物品的实例分割信息" ID="e258e949c596734d3a3a0530eb58c020" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/execute_pick_task" ID="6d653088956d0fabbe0f87ce1d7debaf" STYLE="fork">
        <node TEXT="description" ID="691d346ed6dad0bcf541d67a5ff9df83" STYLE="fork">
          <node TEXT="输出物品名称执行抓取服务" ID="330f0f3a1e5cd7e89a37f6d5d6d72f65" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="69f91e8739ab09dadb025b5b38170eba" STYLE="fork">
          <node TEXT="Service" ID="513333e63335442280c6c4b41178614e" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="650f2f8cb55b0d47f062963c5e8df330" STYLE="fork">
          <node TEXT="ExecutePickTask" ID="c20596a05f61975acf2e983c5a679d20" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="c701d968417158cd3be9c5c607e34f80" STYLE="fork">
          <node TEXT="rosservice call /execute_pick_task &quot;target_label: chips_can_orin&quot;" ID="b1df0971ea3a577b6b64e7a05280a3d3" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="0042200bdf55e23bec78ebc46188d88f" STYLE="fork">
          <node TEXT="帮我拿xxx物品" ID="e4bbf80705c9eeee3bd663729122dcf1" STYLE="fork">
            <node TEXT="调用该服务执行抓取" ID="db35a889dd6b664a97e2d4aa780cc6d6" STYLE="fork"/>
          </node>
        </node>
      </node>
    </node>
    <node TEXT="/navigation" ID="77917c125ee51d590960390fd7e90208" STYLE="bubble" POSITION="left">
      <node TEXT="/odom_info" ID="055633893c8638d6b5db6479b858f06d" STYLE="fork">
        <node TEXT="description" ID="2ab316e9adc355d5803f56a38e060aca" STYLE="fork">
          <node TEXT="当前位姿信息，有定位时才会输出结果" ID="0248e83f1169f41555344b4720e82956" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="85dfee1762513371172f650d28a434ca" STYLE="fork">
          <node TEXT="Topic/Subscriber" ID="22d202ad82d05327a88b059e5d306284" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="d644afc4baff4b1a07cc26965dbdb1ec" STYLE="fork">
          <node TEXT="nav_msgs/Odometry" ID="c179922a8ad45a944694b6791f288179" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="8852837521df8a2e785ee91121ae1c59" STYLE="fork">
          <node TEXT="10" ID="e07ab3234e76e9fbd032a8fe38f54e2b" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="aa657d2d54e731cb97fd8a30d39aa465" STYLE="fork">
          <node TEXT="rostopic echo /odom_info" ID="42f73907041bd3aebd2dcc99a42e6b24" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/local_map" ID="f29eb3d90067cb9722a69aa07d4e6bda" STYLE="fork">
        <node TEXT="description" ID="95db09e5cc85a9e74238af10c5c84569" STYLE="fork">
          <node TEXT="局部障碍物信息" ID="9b8189c9a1dab846bb2c99b3c1a8a6d6" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="c95d10ffd1df4a5f74925cd79118997e" STYLE="fork">
          <node TEXT="Topic/Subscriber" ID="1708c557c7239a5c32faee183e8ceb30" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="0c9da3bb778fe2e34068a278d00635b5" STYLE="fork">
          <node TEXT="LocalMap" ID="e967cedd2c1b713c03c7d5c022b0079f" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="8e9e6f72e0dff500f4562437033fefaa" STYLE="fork">
          <node TEXT="10" ID="1cd7259f3df6a3635fd3cf47eac9ed71" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="2f9cc96dc81e5455815398b953a6554f" STYLE="fork">
          <node TEXT="rostopic echo /odom_info" ID="948da9c0000a643158caea6d270f1b86" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/task_info" ID="45a967dac8d31e5e95759d9f0316c1eb" STYLE="fork">
        <node TEXT="description" ID="52506641b60831a9d619c13e9e23ba15" STYLE="fork">
          <node TEXT="发布导航任务信息，该话题仅发布导航任务，不返回导航的结果" ID="bca0ed4df3b8501187bea7f8d3873ef1" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="d1ad19774bd9d1fc1597fcd63c03d0ae" STYLE="fork">
          <node TEXT="Topic/Publish" ID="06a8a0643ef6ad156ddda0b4f54966d0" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="15608e9db91e3a9273323ebd6a6e1410" STYLE="fork">
          <node TEXT="TakInfo" ID="4dc64749d05084ff23d693db71dc31ba" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="9f5923fc83d9c9033474e4eecc57f5e3" STYLE="fork">
          <node TEXT="1" ID="4db648f9847976316c5a56fa1694a53e" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="6aa762519e1d3ddfe0a6eac962d2d84f" STYLE="fork">
          <node TEXT="point2point.py" ID="ab3d4ecc2bc2784a399baee5e4a83f96" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/navigation_status" ID="8f5e2e42c72ed830b4da33cf9a1e6314" STYLE="fork">
        <node TEXT="description" ID="43a48fe8f64a389453e3fb47772a3045" STYLE="fork">
          <node TEXT="当前导航状态信息" ID="6abc4db7a8a9aaaa8ad22edbb42019b5" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="92b7c788aabe417b14ae045d29a7be6a" STYLE="fork">
          <node TEXT="Topic/Subscriber" ID="01260ae69d55d5228e00616141e99162" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="d4ac9b260ed13f0451ed9b914a20ef15" STYLE="fork">
          <node TEXT="NavigationStatus" ID="a3ba44dd454fa633a62c69baa1c7a4f6" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="f595a98a48858a9ec4945eca0a6fbfbf" STYLE="fork">
          <node TEXT="20" ID="f47b7451670b21dac97d811a3578f725" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="791b267c922179902fb35a998b0aa7ee" STYLE="fork">
          <node TEXT="rostopic echo /navigation_status" ID="f6fdd049c258dcb040473e5e00483d0b" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/globalmap" ID="7151b0644a0e6ffdf5b19eb31b7b89fe" STYLE="fork">
        <node TEXT="description" ID="7de7008d8b778a49b28c545e617c4b51" STYLE="fork">
          <node TEXT="全局地图信息" ID="369191cf1c5ca8f211905c0c532807df" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="3a398d4d4b59d46312eeee9ef1a0d960" STYLE="fork">
          <node TEXT="Topic/Subscriber" ID="23fe712dab02ba94289a65863e32a239" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="da1cb86556ff9895df6be9c4c55f40b8" STYLE="fork">
          <node TEXT="nav_msgs/OccupancyGrid" ID="223541af3c89de264639c4291ec6693f" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="65ac1acab24c91f428ba0804fcecc9d2" STYLE="fork">
          <node TEXT="非实时" ID="9463e74ed4ea7365af93763c1bf18bf1" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="75e034c95bf09091cfbe1429156b6f94" STYLE="fork">
          <node TEXT="rostopic echo /globalmap" ID="947aaac260ba00144e397996526e6812" STYLE="fork"/>
        </node>
      </node>
    </node>
    <node TEXT="/audio" ID="14ae2714a758b73a7b61df99ddb97450" STYLE="bubble" POSITION="left">
      <node TEXT="/microphone" ID="d4fe34be8bf1186a6affd6268af3d894" STYLE="fork">
        <node TEXT="/get_devices_list" ID="f544fa9816c517d07c5df1690c2c2a36" STYLE="fork">
          <node TEXT="description" ID="55ad1e8113a75a985bc249557ba6dd31" STYLE="fork">
            <node TEXT="获取麦克风设备列表" ID="773e6969b6ef788142d74067473fe54a" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="03f4f64952976c5839e9363471e56fdc" STYLE="fork">
            <node TEXT="Service" ID="3d8dc611b7c267490d44327a54d3f8f4" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="5200fd38c48df344a6d5df80cdda1c6b" STYLE="fork">
            <node TEXT="GetDeviceList" ID="5ff9e82d0bee6a851713cee004ea766b" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="65e1a2bdb5980eecb797e2ca7ade30c0" STYLE="fork">
            <node TEXT="" ID="502a810093cac992b97a62b275d91651" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="3c9e41d122c9d02e8bbba777c062ebb0" STYLE="fork">
            <node TEXT="检查当前有多少个麦克风设备" ID="4a7bd74537cccf3e3537d1d279af76fb" STYLE="fork">
              <node TEXT="回复数量应大于1" ID="e8f70bb12fac2bce89c026b0e17089ae" STYLE="fork"/>
            </node>
          </node>
        </node>
        <node TEXT="/select_device" ID="04b2d1d8a8e7a3985677bf89d6d04612" STYLE="fork">
          <node TEXT="description" ID="08944d2d6cc4ea42d0f34dfa76080d73" STYLE="fork">
            <node TEXT="选中生效麦克风" ID="6399a62280f2917ca3e0d3f3015f6c66" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="21224a468f28cc999885acfd3fbeb8e4" STYLE="fork">
            <node TEXT="Service" ID="669d1113f97a532a9a5237447a7becaa" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="cddad9ca81f6e81a8f6dadbd99127e15" STYLE="fork">
            <node TEXT="SetDevice" ID="979efaef82e6f43cec534271326b1ab3" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="11f09204267caa701e6a8a5d2a8960e5" STYLE="fork"/>
          <node TEXT="agent" ID="a25841770d1a7908c7597bd9876bea1a" STYLE="fork">
            <node TEXT="选择第一个麦克风" ID="20c8d189ec338ba711bc973a2a1a8d52" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/audio_data" ID="97d49e113773ae496db0419140f41dac" STYLE="fork">
          <node TEXT="description" ID="b678dec0c9d91a2ffd343bcc0fbe6dce" STYLE="fork">
            <node TEXT="麦克风收音后的音频数据流" ID="1275ce24817492c3884f45e9f71ef1c4" STYLE="fork"/>
          </node>
          <node TEXT="msg_type: " ID="20ace7a860bfcb6e6c30ea7380aeb0fe" STYLE="fork">
            <node TEXT="AudioDate" ID="dae70efbf3407fb0dd1935e116cc489c" STYLE="fork"/>
          </node>
          <node TEXT="hz" ID="c0ebb2a729f748c5cba11959d9bde510" STYLE="fork"/>
          <node TEXT="demos" ID="e95609c2a4eff8064d3fa5752e9617f4" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/speaker" ID="5d79ef19406aeba394b0609e2fb62325" STYLE="fork">
        <node TEXT="/get_devices_list" ID="52159d6eea729de6bb34408de5b6cfa9" STYLE="fork">
          <node TEXT="description" ID="442aeb92187e49737fe35170ebc07802" STYLE="fork">
            <node TEXT="获取喇叭设备列表" ID="44a1ba002486fb272837f97a78b20928" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="203bc55f2613b3a8b80fde1fe15898c0" STYLE="fork">
            <node TEXT="Service" ID="4eefe8f8d710035e69a6e0feba91ba10" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="1a36b01c388381ca1b90d1d29fca9e81" STYLE="fork">
            <node TEXT="" ID="324a668da5ff54c0091b159187e0579e" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="e746408db5da9a945ac47f1c1d650b5a" STYLE="fork">
            <node TEXT="检查当前有多少个喇叭设备" ID="9be6620d2c6cdf3c82af348d0c4cec8f" STYLE="fork">
              <node TEXT="回复数量应大于1" ID="4b0db8e324ab4c405ed6b7585251325b" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="msg_type" ID="22907270e1387f2767d44c801a291379" STYLE="fork">
            <node TEXT="GetDeviceList" ID="16edfa1bc8c8c42c0c9a1671ba6fc946" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/select_device" ID="a598cbac3953e2aa8d4271ae776fa2a8" STYLE="fork">
          <node TEXT="description" ID="b42ba17c549ae5a9e0a75ede1c28b86c" STYLE="fork">
            <node TEXT="选中生效喇叭" ID="971a56583914242e816c2d17f92da8c3" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="282af53f15ea420c0a6de93e43f6d213" STYLE="fork">
            <node TEXT="Service" ID="0ec817b4e150c4152a5f76bc1d696f50" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="1f8689217cebbc631ca9e0bbe4819ade" STYLE="fork">
            <node TEXT="SetDevice" ID="10c15a4fd5e697db8abcc590bb3b1004" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="32cadfa48bc316fdd3040986f46236c8" STYLE="fork"/>
          <node TEXT="agent" ID="5ccc052ccce94bc4a6d98ad39536a0e9" STYLE="fork">
            <node TEXT="选择第一个喇叭" ID="1542ab1febc9a8d90ffcd244072b66ef" STYLE="fork"/>
          </node>
        </node>
        <node TEXT="/get_volume" ID="e7b53fdce236d1857390e94e6c1c5668" STYLE="fork">
          <node TEXT="description" ID="d8cb0d01595137debefa40a5bf8a4325" STYLE="fork">
            <node TEXT="获取当前音量" ID="b1ecc95c7772492e0a2f907ceceed5cf" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="8b06cf80e77a17229dd0b4a1225ab34d" STYLE="fork">
            <node TEXT="Service" ID="3e47fda96f72b50790900d888247979c" STYLE="fork"/>
          </node>
          <node TEXT="msg_type" ID="b7b1af1811dff114df6850596dbe32ae" STYLE="fork">
            <node TEXT="GetVolume" ID="b0d932616469b8714b104ebeb19ae497" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="7f54589e0aee314cad2e250b931ffdd0" STYLE="fork">
            <node TEXT="获取当前的系统音量大小" ID="4b9f12866028ded2d3384191cd3e0a0d" STYLE="fork">
              <node TEXT="应回复音量0~100" ID="2447d653381eb8fe5988591ad8a75fa8" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="demos" ID="e5555ae057d4ad88bb515144b900a2ac" STYLE="fork"/>
        </node>
        <node TEXT="/set_volume" ID="6f51c0de78a49fc4e70111fe9a9be224" STYLE="fork">
          <node TEXT="description" ID="0ed9fa266bfb2544c5a1868b3559a88c" STYLE="fork">
            <node TEXT="设置当前音量大小" ID="4feec6e19b8141555f2ca2847c9c8c04" STYLE="fork"/>
          </node>
          <node TEXT="type" ID="f97c59b645907efa49c0c3d71f0e293c" STYLE="fork">
            <node TEXT="Service" ID="5c86bfa926ac50338331bfe7451f77dc" STYLE="fork"/>
          </node>
          <node TEXT="agent" ID="065db160da44327a67a82b3d51cf3257" STYLE="fork">
            <node TEXT="设置音量为50" ID="84428e10786b77ae29910580b1d676f1" STYLE="fork">
              <node TEXT="" ID="ca6d35cc899ab5416d9a5737eca6e4b1" STYLE="fork"/>
            </node>
          </node>
          <node TEXT="msg_type" ID="33eb1df40ea0d780bbad6c352ff1c62a" STYLE="fork">
            <node TEXT="SetVolume" ID="fc2922cfedee7d8c3e1ca200a0037394" STYLE="fork"/>
          </node>
          <node TEXT="demos" ID="a98e7a33fef6ff7bcdf926d04432c7a0" STYLE="fork"/>
        </node>
      </node>
      <node TEXT="/listen" ID="726fd9004594d90a9ef0e74cc3118d7b" STYLE="fork">
        <node TEXT="description" ID="9fc7881a6607c0ee84327fe68bee57d4" STYLE="fork">
          <node TEXT="倾听服务" ID="2d5bc983513bc981aa2ef6004bbdf3af" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="42f20f58437891dc86b3f6bcab591917" STYLE="fork">
          <node TEXT="Service" ID="cdf7ce618b3ac4e3f281726eb4f9ac0e" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="7641e41bb155222519d8b23efa4351d8" STYLE="fork">
          <node TEXT="Listen" ID="96f5b3c9223cdaf4b4ceab799b1e4f2d" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="9722a235046475617eb2fcff7720143d" STYLE="fork">
          <node TEXT="开始倾听" ID="ad677e040c223f3e10b260f0cf3c3894" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="1ef195adce2f3243e366d09e142f795d" STYLE="fork"/>
      </node>
      <node TEXT="/listen_state" ID="8f1874548faf239245ce12a06f8b632d" STYLE="fork">
        <node TEXT="description" ID="1f641f3104a3568262e6d8a2b24236d3" STYLE="fork">
          <node TEXT="唤醒倾听状态发布" ID="7d70479420da9460d8331d00e9457756" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="9c8523c9fbba6b46b6db0e7d63e65ae5" STYLE="fork">
          <node TEXT="Topic/Publish" ID="ac136c3980d5efdf45b8ea35295f8a12" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="6d02bdca77d52bf9705b119b0481fdae" STYLE="fork">
          <node TEXT="ListenInfo" ID="299a36816bc6c5edacc548464019c7dd" STYLE="fork"/>
        </node>
        <node TEXT="hz" ID="f5d932d5957825678829e2384393aa4b" STYLE="fork">
          <node TEXT="100hz" ID="47d7385c2cec5f7def1bd01d39fb243d" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="f645bafb87323f54926ae34168eb8abb" STYLE="fork">
          <node TEXT="当前是否为倾听状态" ID="898a5ba46b13a5ffa41a92175b51e116" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="4baa5db1322c322dd5fbe9aaa94a5a14" STYLE="fork"/>
      </node>
      <node TEXT="/asr_text" ID="f44cf36a659c4ec649b29d2d2f257181" STYLE="fork">
        <node TEXT="description" ID="525726d576253ba5481345ed0a705cc4" STYLE="fork">
          <node TEXT="语音转文字服务" ID="8bdf62c8af3022b5b9e86a9aaa2eb92a" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="74b19aed9a8b16f1279b8f000be07906" STYLE="fork">
          <node TEXT="Topic/Publish" ID="0752b431b09fb5d0b1358e6288810141" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="705dd64991819741ad36124d8e01f615" STYLE="fork">
          <node TEXT="" ID="eb84f3524ea92c18268843d7ff774248" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="1890a2c6061743841d20ce8a22e8ee9a" STYLE="fork">
          <node TEXT="当前机器人听到了什么" ID="b0b588b99b83da4545dff0c28aa50d08" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="8cb0ce71d749edc51cf278aabe05ec8c" STYLE="fork"/>
      </node>
      <node TEXT="/tts_service" ID="dd5ec676f8ea60b7e784a9b7ce5d4439" STYLE="fork">
        <node TEXT="description" ID="0783dfef75790ffe332ee713508fc616" STYLE="fork">
          <node TEXT="文字转语音服务" ID="77fa9af2085160fb6c8af6120bb02eb1" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="6c14b8690511ca44f9b85ff5252706c4" STYLE="fork">
          <node TEXT="Service" ID="a69bb90975c942f5a5d36d1c3ed2e459" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="6ee99a25ba5146bda00e1a4483b60fff" STYLE="fork">
          <node TEXT="TTS" ID="8ab19b700cd4dd4353a08e52776d291f" STYLE="fork"/>
        </node>
        <node TEXT="agent" ID="ada11c21f355c7ae0925b6ba1f50a07a" STYLE="fork">
          <node TEXT="请让机器人说“hello world”" ID="7ee49ba9dda738eaa223403692ff38c0" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="6f67bc2fea188a107e7bbad091e2d8f9" STYLE="fork"/>
      </node>
      <node TEXT="/media_play" ID="ff5eb78925a6526fb711a4e9c5b47bba" STYLE="fork">
        <node TEXT="description" ID="39d4fd2619286f899ae83102c4005c07" STYLE="fork">
          <node TEXT="音频文件播放" ID="31e646c8cfc0a106fd62c8cfe5fea8e0" STYLE="fork"/>
        </node>
        <node TEXT="请播放“公司介绍.mp3”" ID="e7c56fb389e6ef6fe73dc63f7933c999" STYLE="fork"/>
        <node TEXT="type" ID="bbe281c2738a38e470d82ebc5f839311" STYLE="fork">
          <node TEXT="Service" ID="a29ecebf7e318d9108f20ca50cdb235c" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="e6766082c033a624a206b156daca264f" STYLE="fork">
          <node TEXT="MediaPlay" ID="83c60aea521bb848b491b3aad0a4b6f9" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="c156995a8a019b59d740b78e259a4258" STYLE="fork"/>
      </node>
      <node TEXT="/LLM_chat" ID="a026ecb26d1310eaee5839e8c7334a2c" STYLE="fork">
        <node TEXT="description" ID="91d8646af14b9eb5c3b0856e36d51357" STYLE="fork">
          <node TEXT="LLM智能对话服务" ID="f46067dc449cd928984327dffac04409" STYLE="fork"/>
        </node>
        <node TEXT="和机器人发起对话，说“hello world”" ID="2c9e4b7d98778a47b7f9e8ebf5b5cb23" STYLE="fork">
          <node TEXT="" ID="7c89c1a7d36ec74f6d70ba61df774b12" STYLE="fork"/>
        </node>
        <node TEXT="type" ID="349101b17c658d0b4742735a6cdecc9a" STYLE="fork">
          <node TEXT="Service" ID="cabe7f65e29f6008d67a42f91ebd413e" STYLE="fork"/>
        </node>
        <node TEXT="msg_type" ID="2b71d864510a0a2c037fda135469852e" STYLE="fork">
          <node TEXT="" ID="0927f8bf7f21b76a78e484336465b5af" STYLE="fork"/>
        </node>
        <node TEXT="demos" ID="5e16cdc1342c6051454a69eb53d9f7e0" STYLE="fork"/>
      </node>
    </node>
  </node>
</map>