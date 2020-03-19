import {
    isURL
} from '@/utils/validate';

//TokenKey
export const TokenKey = 'Access-Token';

//古诗词合集地址
export const PoetAddr = [
    //'https://yunwisdoms.gitee.io/chinese-poetry/youmengying/youmengying.json', //幽梦影
    'https://yunwisdoms.gitee.io/chinese-poetry/shijing/shijing.json', //诗经
    'https://yunwisdoms.gitee.io/chinese-poetry/wudai/huajianji/huajianji-1-juan.json', //花间集01
    'https://yunwisdoms.gitee.io/chinese-poetry/wudai/huajianji/huajianji-2-juan.json', //花间集02
    'https://yunwisdoms.gitee.io/chinese-poetry/wudai/huajianji/huajianji-3-juan.json', //花间集03
    'https://yunwisdoms.gitee.io/chinese-poetry/wudai/huajianji/huajianji-4-juan.json', //花间集04
    'https://yunwisdoms.gitee.io/chinese-poetry/wudai/huajianji/huajianji-5-juan.json', //花间集05
    'https://yunwisdoms.gitee.io/chinese-poetry/wudai/huajianji/huajianji-6-juan.json', //花间集06
    'https://yunwisdoms.gitee.io/chinese-poetry/wudai/huajianji/huajianji-7-juan.json', //花间集07
    'https://yunwisdoms.gitee.io/chinese-poetry/wudai/huajianji/huajianji-8-juan.json', //花间集08
    'https://yunwisdoms.gitee.io/chinese-poetry/wudai/huajianji/huajianji-9-juan.json', //花间集09
    'https://yunwisdoms.gitee.io/chinese-poetry/wudai/huajianji/huajianji-x-juan.json', //花间集0x
    'https://yunwisdoms.gitee.io/chinese-poetry/wudai/nantang/poetrys.json', //五代十国南唐后主词
    'https://yunwisdoms.gitee.io/chinese-poetry/mengxue/qianjiashi.json', //千家诗
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.0.json', //宋诗
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.1000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.10000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.100000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.101000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.102000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.103000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.104000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.105000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.106000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.107000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.108000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.109000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.11000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.110000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.111000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.112000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.113000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.114000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.115000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.116000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.117000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.118000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.119000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.12000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.120000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.121000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.122000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.123000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.124000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.125000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.126000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.127000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.128000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.129000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.13000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.130000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.131000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.132000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.133000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.134000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.135000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.136000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.137000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.138000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.139000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.14000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.140000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.141000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.142000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.143000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.144000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.145000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.146000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.147000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.148000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.149000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.15000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.150000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.151000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.152000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.153000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.154000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.155000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.156000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.157000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.158000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.159000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.16000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.160000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.161000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.162000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.163000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.164000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.165000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.166000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.167000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.168000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.169000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.17000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.170000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.171000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.172000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.173000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.174000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.175000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.176000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.177000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.178000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.179000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.18000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.180000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.181000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.182000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.183000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.184000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.185000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.186000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.187000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.188000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.189000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.19000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.190000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.191000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.192000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.193000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.194000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.195000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.196000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.197000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.198000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.199000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.2000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.20000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.200000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.201000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.202000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.203000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.204000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.205000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.206000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.207000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.208000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.209000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.21000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.210000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.211000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.212000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.213000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.214000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.215000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.216000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.217000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.218000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.219000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.22000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.220000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.221000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.222000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.223000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.224000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.225000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.226000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.227000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.228000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.229000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.23000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.230000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.231000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.232000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.233000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.234000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.235000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.236000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.237000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.238000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.239000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.24000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.240000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.241000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.242000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.243000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.244000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.245000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.246000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.247000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.248000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.249000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.25000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.250000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.251000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.252000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.253000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.254000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.26000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.27000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.28000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.29000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.3000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.30000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.31000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.32000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.33000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.34000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.35000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.36000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.37000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.38000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.39000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.4000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.40000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.41000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.42000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.43000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.44000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.45000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.46000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.47000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.48000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.49000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.5000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.50000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.51000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.52000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.53000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.54000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.55000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.56000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.57000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.58000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.59000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.6000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.60000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.61000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.62000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.63000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.64000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.65000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.66000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.67000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.68000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.69000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.7000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.70000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.71000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.72000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.73000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.74000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.75000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.76000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.77000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.78000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.79000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.8000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.80000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.81000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.82000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.83000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.84000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.85000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.86000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.87000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.88000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.89000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.9000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.90000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.91000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.92000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.93000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.94000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.95000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.96000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.97000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.98000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.song.99000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.0.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.1000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.10000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.11000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.12000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.13000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.14000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.15000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.16000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.17000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.18000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.19000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.2000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.20000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.21000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.22000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.23000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.24000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.25000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.26000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.27000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.28000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.29000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.3000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.30000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.31000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.32000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.33000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.34000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.35000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.36000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.37000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.38000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.39000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.4000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.40000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.41000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.42000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.43000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.44000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.45000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.46000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.47000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.48000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.49000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.5000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.50000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.51000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.52000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.53000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.54000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.55000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.56000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.57000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.6000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.7000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.8000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/json/poet.tang.9000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.0.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.1000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.10000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.11000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.12000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.13000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.14000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.15000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.16000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.17000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.18000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.19000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.2000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.20000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.2019y.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.21000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.3000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.4000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.5000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.6000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.7000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.8000.json',
    'https://yunwisdoms.gitee.io/chinese-poetry/ci/ci.song.9000.json',
];

/**
 * @function 获取打招呼信息
 */
export function timeFix() {
    const time = new Date();
    const hour = time.getHours();
    return hour < 9 ?
        '早上好' :
        hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好';
}

/**
 * @function 获取随机诗词内容
 */
export function poet() {

}

/**
 * @function 获取
 */
export function welcome() {
    const arr = [
        '『 小主，文档如果需要预览，最好用docx、pptx、xlsx格式，而不要使用老版本的doc、ppt、xls格式哟🤗！』',
        '『 小主，上传的附件中，文档名称不能含有空格哦(≖‿≖)✧。不然的话，可能导致无法下载附件哟😄！』',
        '『 小主，上传的图片中，图片名称不要包含空格哦，我的小机器眼可看不清哟，要是预览不了可不要怪本宝宝☹️ 』',
        '『 小主，可以在首页，Tab栏中，查看我的待办，我的已办哟(≖‿≖)✧😄！』',
        '『 小主，我的待办，处理完毕后，请记得点击首页页面Tab栏右侧的刷新按钮哟🤗！』',
        '『 小主，审批同意后，可以在我的已办中查看处理过的记录哦💪！』',
        '『 小主，在工作台的Tab栏页面中，右侧可有快捷菜单哦👌！』',
        '『 小主，如果页面和别的同学不一样，可能是小主没有清空缓存哦，按F12,弹出调试窗口，在Network栏中选择Disable Cache，然后刷新页面，即可清空缓存哦🤗 』',
        '『 小主，上传附件，上传图片，请不要上传超过30M的文档哦⏰！』',
        '『 小主，上传图片前，先记得压缩后在上传哦🤗！』',
        '『 小主，你的待办任务处理好了不👌？』',
        '『 小主，你处理完毕的任务，可以在我的已办中查看哦😁！』',
        '『 小主，你要记得，工作台右侧或者上侧有快捷导航哦😊！』',
        '『 小主，忙了这么久，要不休息一会儿吧😴！』',
        '『 小主，待会儿准备吃什么呢🍚?』',
        '『 小主，加油💪哦，我相信你！！！』',
        '『 小主，要不要喝杯茶，休息一下😝？』',
        '『 小主，渴不渴，来杯咖啡不☕️？』',
        '『 小主，眼睛是心灵的窗户，屏幕看久了，别忘了做做眼保健操🤗！』',
        '『 小主，身体是革命的本钱💰，记得多做运动哦🏃！』',
        '『 小主，我猜你可能累了😢，要不休息一会儿吧！』',
        '『 小主，今天要来杯枸杞茶不🍵？』',
        '『 小主，要来杯浓咖啡☕️不？醒醒脑⏰！』',
        '『 小主，中午点外卖不🤩？』',
        '『 小主，来首Music不🎵？』',
        '『 小主，老板来了，快赶紧工作😝！』',
        '『 小主，推荐你使用谷歌、火狐、Opera等浏览器哦🤗！』',
        '『 我们奋力前行，逆水行舟，被不断向后推，直至回到往昔岁月💪 』—《了不起的盖茨比》 ',
        '『 前尘种种，似烟似幻，惟有此人教我深感不负大好春光🗡。』 ',
        '『 观察的实质是：“不赞美，不责难，甚至也不惋惜，但求了解认识而已😺。”』—《柴静》',
        '『 走得再远，看得再细，终究会有这样那样的错过，不可能真正将风景看遍🌅。』—《剑来》',
        '『 每想你一次，天上飘落一粒沙，从此形成了撒哈拉！😝』—《撒哈拉的故事》 ',
        '『 我们一路奋战，不是为了改变世界，而是为了不让世界改变我们。💪』—《熔炉》',
        '『 春复一春，枝头黄莺飞。秋复一秋，城头大雁归。🔪』—《雪中悍刀行》 ',
        '『 如果命运是一条孤独的河流，谁会是你灵魂的摆渡人？🤗』—《摆渡人》 ',
        '『 心向花开，何不朝夕。』—《百年浅吟》',
        '『 单程孤舟，出云入霞，如歌如吟。』 — 《门孔》 ',
        '『 毁灭你，与你有何相干?』 — 《三体》',
        '『 有些意外是意料之中，有些意外是意料之外，而你，就是我意料之外的意外。』 — 《撒野》 ',
        '『 成王败寇，失败才是丑恶的。』 — 《惊悚乐园》',
        '『 胆小鬼连幸福都害怕，碰到棉花都会受伤 』 — 《人间失格》 ',
        '『 你知道吗，有些人，会以各种你情愿或者不情愿的方式，留在你的记忆里，比如我。』 — 《撒野》',
        '『 很多人宁可否认事实，也不愿面对真相。』 — 《冰与火之歌》',
        '『 你们认为没有路，是因为没有学会不择手段。』 — 《三体》',
        '『 当我忘了你的时候，我就忘了我自己。』 — 《呼啸山庄》',
        '『 言念君子温其如玉』 — 《剑来》',
        '『 一草一千秋，一花一世界。』 — 《目送》',
        '『 “马孔多在下雨”』 — 《百年孤独》',
        '『 他只有两只手，所以只能用心抓住一个人。』 — 《黑天》',
        '『 西方人并不比东方人聪明，但是他们却找对了路。』 — 《三体》 ',
        '『 悲剧将人生的有价值的东西毁灭给人看，喜剧将那无价值的撕破给人看。』 — 《语丝》 ',
        '『 今日，吾爱，我们融为一体。』 — 《SCP基金会》 ',
        '『 用我一生，换你十年天真无邪。』 — 《盗墓笔记》 ',
        '『 弱肉强食的世界，强者没有理由道歉，弱者也没有资格埋怨。』 — 《惊悚乐园》 ',
        '『 没有谁的生活会一直完美，但无论什么时候，都要看着前方，满怀希望就会所向披靡。』 — 《撒野》 ',
        '『 乌鸦为什么像写字台？』 — 《爱丽丝梦游仙境》 ',
        '『 我恨自己。我爱自己。』 — 《SCP基金会》 ',
        '『 正义不会因为无人歌颂而变成非议。』 — 《阿亚罗克年代记》 ',
        '『 在永恒与虚无之间，为你沉默。』 — 《请以你的名字呼唤我》 ',
        '『 生而为人，我很抱歉』 — 《人间失格》 ',
        '『 活着本身就很美妙，如果连这道理都不懂，怎么去探索更深的东西呢？』 — 《三体》 ',
        '『 我一直以为人是慢慢变老的，其实不是，人是一瞬间变老的。』 — 《舞！舞！舞！》 ',
        '『 我有一个梦，也许有一天，灿烂的阳光能照进黑暗森林。』 — 《三体》 ',
        '『 即使被关在果壳之中，我仍自以为是无限宇宙之王。』 — 《哈姆雷特》',
        '『 “太阳快落下去了，你们的孩子居然不害怕？”“当然不害怕，她知道明天太阳还会升起来的。”』 — 《三体II》 ',
        '『 你永远是我唯爱旅行中名为秘密的起点站。』 — 《绘心》 ',
        '『 你应该是上天赐予我的满心欢喜。』 — 《荒生虚闻录》 ',
        '『 要是有些事我没说，你别以为是忘了，我什么也没忘，但是有些事只适合收藏。』 — 《我与地坛》 ',
        '『 君看双眼色，不语似无忧』 — 《俳句 罗生门》 ',
        '『 爱恋中的每个瞬间都有可能是一生。』 — 《文学》 ',
        '『 你最可爱,我说时来不及思索,但思索过后,还是这样说』 — 《普希金》 ',
        '『 有一种东西不能遵循从众原则，那就是人的良心。』 — 《杀死一只知更鸟》 ',
        '『 我要赢一壶酒，拿来娶你。』 — 《撒野》 ',
        '『 我把人生看成是无常的，把人的无可奈何、与生俱来的轻薄看成是虚无的。』 — 《心》 ',
        '『 读书人皆是负心人，最负痴心人。』 — 《雪中悍刀行》 ',
        '『 叹飘渺，莫过春樱转瞬逝；怜世间,万千繁华始归尘。』 — 《绯弹的亚里亚》 ',
        '『 凡事都有一个与一望而知不同的真相』 — 《约翰·勒卡雷》 ',
        '『 世间本无公平可言，除非公平掌握在自己手中。』 — 《冰与火之歌》 ',
        '『 给时光以生命，给岁月以文明。』 — 《三体:黑暗森林》 ',
        '『 我触摸不到的除了喜马拉雅山顶的雪，还有你。』 — 《同学录》 ',
        '『 亭边总有花影，与我消遣一段旖旎的小时光。』 — 《最美是花影不扫》',
        '『 负霜华，行世路。一同星尘，除魔歼邪』 — 《魔道祖师》 ',
        '『 人生若只如初见，何事秋风悲画扇。』— 纳兰性德《木兰词·拟古决绝词柬友》',
        '『 我变了。因为我不变，就活不下去。』 — 《幸会，吃人鬼》',
        '『 愿来世，你晓天，晓地，晓星尘。』 — 《魔道祖师》',
        '『 想带你去看电影，明天你就不是我女朋友了。』 — 《撒哈拉的故事》 ',
        '『 当一切都消失的时候，你会明白生命究竟有何价值。』 — 《冰与火之歌》 ',
        '『 我站在路口，哈出的气可以把那些六角形的雪融化。』 — 《嗨，STORM GLASS》 ',
        '『 影响大众想象力的，并不是事实本身，而是它扩散和传播的方式。』 — 《乌合之众》 ',
        '『 给岁月以文明，而不是给文明以岁月。』 — 《三体》 ',
        '『 亭边总有花影，与我消遣一段旖旎的小时光。』 — 《最美是花影不扫》 ',
        '『 你不是不擅长学习，只是没有找到自己想要学习的东西而已。』 — 《梦幻花》 ',
        '『 是非在己，毁誉由人，得失不论。』 — 《魔道祖师》 ',
        '『 全是理智的心，恰如一柄全是锋刃的刀。它叫使用它的人手上流血。』 — 《飞鸟集》',
        '『 樱花落在赤裸的土壤上再也不会绽放，教室的窗外响起了蝉鸣，夏天到了。』 — 《野蛮生长》 ',
        '『 我一直以为人是慢慢变老的，其实不是，人是一瞬间变老的。』 — 《舞！舞！舞！》 ',
        '『 在童话中，一个人做他想做的事；在现实中，一个人做他能做的事。』 — 《埃莱娜·费兰特》 ',
        '『 所谓癌症，治疗的过程就是痛苦。』 — 《我，处于地狱之中》 ',
        '『 遇事不决，可问春风。』 — 《剑来》 ',
        '『 对友谊来说，笑声确实是个不错的开端，同时也是最好的结局。』 — 《道林·格雷的画像》 ',
        '『 你永远也看不到我最寂寞时候的样子，因为只有你不在我身边的时候，我才最寂寞。』 — 《爱与痛的边缘》 ',
        '『 地狱太冷，我来殉你。』 — 《二哈和他的白猫师尊》 ',
        '『 我们历经沧桑，这样错过了一生最好的时光。』 — 《黑暗萌主》 ',
        '『 我放着好好的阳关大道不走，走这阴沟里的独木桥干什么。真这么好走早就有人走了。』 — 《魔道祖师》 ',
        '『 生命中曾经有过的所有灿烂，终究都需要用寂寞来偿还。』 — 《百年孤独》 ',
        '『 维罗纳的夏天找不到这样一朵好花。』 — 《罗密欧与朱丽叶》 ',
        '『 快乐固然兴奋，痛苦又何尝不美丽。』 — 《谈生命》 ',
        '『 我以为看到了你，便拥有了整个世界。却没想到你的梦里，早已有了我。』 — 《我欲封天》 ',
        '『 我一边注视沉默的空间里闪闪浮动的光粒子，一边力图确定心的坐标。』 — 《挪威的森林》 ',
        '『 放弃不难，但坚持一定很酷。』 — 《解忧杂货店》 ',
        '『 如果一朵花很美，那么有时我会不由自主地想到：“要活下去！”』 — 《川端康成》 ',
        '『 这是在是我所知物理学中最富诗意的东西：你的一切都是星辰。』 — 《劳伦斯·M·克劳斯》 ',
        '『 曾经沧海难为水，除却巫山不是云。』— 元稹《离思五首·其四》',
        '『 玲珑骰子安红豆，入骨相思知不知。』— 温庭筠《南歌子词二首·杨柳枝词》',
        '『 只愿君心似我心，定不负相思意。』— 李之仪《卜算子·我住长江头》',
        '『 愿得一心人，白头不相离。』— 卓文君《白头吟》',
        '『 去年今日此门中，人面桃花相映红。』— 崔护《题都城南庄》',
        '『 雨打梨花深闭门，忘了青春，误了青春。』— 唐寅《一剪梅》',
        '『 人面不知何处去，桃花依旧笑春风。』— 崔护《题都城南庄》',
        '『 疏影横斜水清浅，暗香浮动月黄昏。』— 林逋《山园小梅》',
        '『 宁可枝头抱香死，何曾吹落北风中。』— 郑思肖《画菊》',
        '『 桃之夭夭，灼灼其华。』— 佚名《桃夭》',
        '『 寂寞空庭春欲晚，梨花满地不开门。』— 刘方平《春怨》',
        '『 人间四月芳菲尽，山寺桃花始盛开。』— 白居易《大林寺桃花》',
        '『 不经一番寒彻骨，怎得梅花扑鼻香。』— 黄蘖禅师《上堂开示颂》',
        '『 竹外桃花三两枝，春江水暖鸭先知。』— 苏轼《惠崇春江晚景》',
        '『 春宵一刻值千金，花有清香月有阴。』— 苏轼《春宵》',
        '『 今人不见古时月，今月曾经照古人。』— 李白《把酒问月》',
        '『 海上生明月，天涯共此时。』— 张九龄《望月怀远》',
        '『 月上柳梢头，人约黄昏后。』— 欧阳修《生查子·元夕》',
        '『 二十四桥明月夜，玉人何处教吹箫？』— 杜牧《寄扬州韩绰判官》',
        '『 露从今夜白，月是故乡明。』— 杜甫《月夜忆舍弟》',
        '『 沧海月明珠有泪，蓝田日暖玉生烟。』— 李商隐《锦瑟》',
        '『 春江潮水连海平，海上明月共潮生。』— 张若虚《春江花月夜》',
        '『 明月几时有？把酒问青天。』— 苏轼《水调歌头·丙辰中秋》',
        '『 云中谁寄锦书来，雁字回时，月满西楼。』— 李清照《一剪梅》',
        '『 世间无限丹青手，一片伤心画不成。』— 高蟾《金陵晚望》',
        '『 黄沙百战穿金甲，不破楼兰终不还。』— 王昌龄《从军行七首·其四》',
        '『 男儿何不带吴钩，收取关山五十州。』— 李贺《南园十三首·其五》',
        '『 落红不是无情物，化作春泥更护花。』— 龚自珍《己亥杂诗·其五》',
        '『 风萧萧兮易水寒，壮士一去兮不复还。』— 佚名《荆轲歌》',
        '『 呜呼！楚虽三户能亡秦，岂有堂堂中国空无人。』— 陆游《金错刀行》',
        '『 苟利国家生死以，岂因祸福避趋之。』— 林则徐《赴戍登程口占示家人》',
        '『 夜阑卧听风吹雨，铁马冰河入梦来。』— 陆游《十一月四日风雨大作》',
        '『 商女不知亡国恨，隔江犹唱后庭花。』— 杜牧《泊秦淮》',
        '『 人生自古谁无死？留取丹心照汗青。』— 文天祥《过零丁洋》',
        '『 休对故人思故国，且将新火试新茶。诗酒趁年华。』— 苏轼《望江南·超然台作》',
        '『 黄沙百战穿金甲，不破楼兰终不还。— 王昌龄《从军行七首·其四》',
        '『 宁可枝头抱香死，何曾吹落北风中。』— 郑思肖《画菊》',
        '『 我见青山多妩媚，料青山见我应如是。』— 辛弃疾《贺新郎·甚矣吾衰矣》',
        '『 男儿何不带吴钩，收取关山五十州。』— 李贺《南园十三首·其五》',
        '『 纸上得来终觉浅，绝知此事要躬行。』— 陆游《冬夜读书示子聿》',
        '『 时人不识凌云木，直待凌云始道高。』— 杜荀鹤《小松》',
        '『 读书不觉已春深，一寸光阴一寸金。』— 王贞白《白鹿洞》',
        '『 沉舟侧畔千帆过，病树前头万木春。』— 刘禹锡《酬乐天扬州初逢席上见赠》',
        '『 大鹏一日同风起，扶摇直上九万里。』— 李白《上李邕》',
        '『 粗缯大布裹生涯，腹有诗书气自华。』— 苏轼《和董传留别》',
        '『 长风破浪会有时，直挂云帆济沧海。』— 李白《行路难·其一》',
        '『 愿得此身长报国，何须生入玉门关。』— 戴叔伦《塞上曲》',
        '『 呜呼！楚虽三户能亡秦，岂有堂堂中国空无人！』— 陆游《金错刀行》',
        '『 位卑未敢忘忧国，事定犹须待阖棺。』— 陆游《病起书怀》',
        '『 咬定青山不放松，立根原在破岩中。』— 郑燮《竹石》',
        '『 出师未捷身先死，长使英雄泪满襟。』— 杜甫《蜀相》',
        '『 天生我材必有用，千金散尽还复来。』— 李白《将进酒》',
        '『 黑发不知勤学早，白首方悔读书迟。』— 颜真卿《劝学诗》',
        '『 我也不登天子船，我也不上长安眠。』— 唐寅《把酒对月歌》',
        '『 人生自古谁无死？留取丹心照汗青。』— 文天祥《过零丁洋》',
        '『 三更灯火五更鸡，正是男儿读书时。』— 颜真卿《劝学诗》',
        '『 古人学问无遗力，少壮工夫老始成。』— 陆游《冬夜读书示子聿》',
        '『 身既死兮神以灵，魂魄毅兮为鬼雄。』— 屈原《国殇》',
        '『 一蓑烟雨任平生。』— 苏轼《定风波·莫听穿林打叶声》',
        '『 生当作人杰，死亦为鬼雄。』— 李清照《夏日绝句》',
        '『 不畏浮云遮望眼，自缘身在最高层。』— 王安石《登飞来峰》',
        '『 千淘万漉虽辛苦，吹尽狂沙始到金。』— 刘禹锡《浪淘沙九首》',
        '『 功名万里外，心事一杯中。』— 高适《送李侍御赴安西》',
        '『 路漫漫其修远兮，吾将上下而求索。』— 屈原《离骚》',
        '『 雄关漫道真如铁，而今迈步从头越。』— 毛泽东《忆秦娥·娄山关》',
        '『 江东子弟多才俊，卷土重来未可知。』— 杜牧《题乌江亭》',
        '『 九万里风鹏正举。风休住，蓬舟吹取三山去。』— 李清照《渔家傲·天接云涛连晓雾》',
        '『 少壮不努力，老大徒伤悲！— 佚名《长歌行》',
        '『 读书破万卷，下笔如有神。』— 杜甫《奉赠韦左丞丈二十二韵',
        '『 千磨万击还坚劲，任尔东西南北风。』— 郑燮《竹石》',
        '『 花门楼前见秋草，岂能贫贱相看老。』— 岑参《凉州馆中与诸判官夜集》',
        '『 富贵必从勤苦得，男儿须读五车书。』— 杜甫《柏学士茅屋》',
        '『 一月不读书，耳目失精爽。』— 萧抡谓《读书有所见作》',
        '『 千锤万凿出深山，烈火焚烧若等闲。』— 于谦《石灰吟》',
        '『 问汝平生功业，黄州惠州儋州。』— 苏轼《自题金山画像》',
        '『 捐躯赴国难，视死忽如归！』— 曹植《白马篇》',
        '『 僵卧孤村不自哀，尚思为国戍轮台。』— 陆游《十一月四日风雨大作》',
        '『 纵被无情弃，不能羞。』— 韦庄《思帝乡·春日游》',
        '『 非学无以广才，非志无以成学。』— 诸葛亮《诫子书》',
        '『 穷且益坚，不坠青云之志。』— 王勃《滕王阁序》',
        '『 安能摧眉折腰事权贵，使我不得开心颜！— 李白《梦游天姥吟留别》',
        '『 老骥伏枥，志在千里。』— 曹操《龟虽寿》',
        '『 看似寻常最奇崛，成如容易却艰辛。』— 王安石《题张司业诗》',
        '『 壮心未与年俱老，死去犹能作鬼雄。』— 陆游《书愤五首·其二》',
        '『 休言女子非英物，夜夜龙泉壁上鸣。』— 秋瑾《鹧鸪天·祖国沉沦感不禁》',
        '『 高山仰止，景行行止。』— 佚名《车舝》',
        '『 清谈可以饱，梦想接无由。』— 韩愈《洞庭湖阻风赠张十一署·时自阳山徙掾江陵》',
        '『 少年心事当拿云，谁念幽寒坐呜呃。』— 李贺《致酒行》',
        '『 丹青不知老将至，富贵于我如浮云。』— 杜甫《丹青引赠曹将军霸》',
        '『 横眉冷对千夫指，俯首甘为孺子牛。』— 鲁迅《自嘲》',
        '『 刑天舞干戚，猛志固常在。』— 陶渊明《读山海经·其十》',
        '『 夫君子之行，静以修身，俭以养德。』— 诸葛亮《诫子书》',
        '『 男儿西北有神州，莫滴水西桥畔泪。』— 刘克庄《玉楼春·戏林推》',
        '『 一日不读书，胸臆无佳想。』— 萧抡谓《读书有所见作》',
        '『 莫嫌举世无知己，未有庸人不忌才。』— 查慎行《三闾祠',
        '『 少年辛苦终身事，莫向光阴惰寸功。』— 杜荀鹤《题弟侄书堂》',
        '『 昨日邻家乞新火，晓窗分与读书灯。』— 王禹偁《清明》',
        '『 莫道谗言如浪深，莫言迁客似沙沉。』— 刘禹锡《浪淘沙九首》',
        '『 卧龙跃马终黄土，人事音书漫寂寥。』— 杜甫《阁夜》',
        '『 大鹏飞兮振八裔，中天摧兮力不济。』— 李白《临路歌》',
        '『 粉骨碎身全不怕，要留清白在人间。』— 于谦《石灰吟》',
        '『 不要人夸好颜色，只留清气满乾坤。』— 王冕《墨梅》',
        '『 未收天子河湟地，不拟回头望故乡。』— 令狐楚《少年行四首·其三》',
        '『 壮志饥餐胡虏肉，笑谈渴饮匈奴血。』— 岳飞《满江红·写怀》',
        '『 三军可夺帅也，匹夫不可夺志也。』— 佚名《论语十二章》',
        '『 归志宁无五亩园，读书本意在元元。』— 陆游《读书》',
        '『 浊酒不销忧国泪，救时应仗出群才。』— 秋瑾《黄海舟中日人索句并见日俄战争地图》',
        '『 烈士暮年，壮心不已。』— 曹操《龟虽寿》',
        '『 万里不惜死，一朝得成功。』— 高适《塞下曲》',
        '『 读书不作儒生酸，跃马西入金城关。』— 谢逸《送董元达》',
        '『 蜀道之难，难于上青天！』— 李白《蜀道难》',
        '『 三杯吐然诺，五岳倒为轻。』— 李白《侠客行》',
        '『 军歌应唱大刀环，誓灭胡奴出玉关。』— 徐锡麟《出塞》',
        '『 寄语天涯客，轻寒底用愁。』— 于谦《除夜太原寒甚》',
        '『 世上无难事，只要肯登攀。』— 毛泽东《水调歌头·重上井冈山》',
        '『 俱往矣，数风流人物，还看今朝。』— 毛泽东《沁园春·雪》',
        '『 只有精忠能报国，更无乐土可为家。』— 董必武《元旦口占用柳亚子怀人韵》',
        '『 激气已能驱粉黛，举杯便可吞吴越。』— 史达祖《满江红·中秋夜潮》',
        '『 金鞍玉勒寻芳客，未信我庐别有春。』— 于谦《观书》',
        '『 梧桐真不甘衰谢，数叶迎风尚有声。』— 张耒《夜坐·庭户无人秋月明》',
        '『 忧劳可以兴国，逸豫可以亡身。』— 欧阳修《伶官传序》',
        '『 此身行作稽山土，犹吊遗踪一泫然。』— 陆游《沈园二首》',
        '『 出不入兮往不反，平原忽兮路超远。』— 屈原《国殇》',
        '『 鞠躬尽瘁，死而后已。』— 诸葛亮《后出师表》',
        '『 灯前目力虽非昔，犹课蝇头二万言。』— 陆游《读书》',
        '『 高岸为谷，深谷为陵。』— 佚名《十月之交》',
        '『 知君惯度祁连城，岂能愁见轮台月。』— 岑参《送李副使赴碛西官军》',
        '『 受任于败军之际，奉命于危难之间。』— 诸葛亮《前出师表》',
        '『 嗟险阻，叹飘零。』关山万里作雄行。』— 刘克庄《玉楼春·戏林推》',
        '『 诚既勇兮又以武，终刚强兮不可凌。』— 屈原《国殇》',
        '『 寻河愁地尽，过碛觉天低。』— 岑参《碛西头送李判官入京》',
        '『 故园三径吐幽丛，一夜玄霜坠碧空。多少天涯未归客，尽借篱落看秋风。』- 唐寅《菊花》',
        '『 我有所念人，隔在远远乡。我有所感事，结在深深肠。乡远去不得，无日不瞻望。肠深解不得，无夕不思量。』 - 白居易 《夜雨》',
        '『 画栋频摇动，红蕖尽倒开。斗匀红粉照香腮。』 - 辛弃疾 《南歌子》',
        '『 浮云几处灭，飞鸟何时还。』 - 王缙',
        '『 霸业成空，遗恨无穷。蜀道寒云，渭水秋风。』 - 查德卿 《蟾宫曲·怀古》',
        '『 草木有本心，何求美人折。』 - 张九龄 《感遇》',
        '『 岂伊地气暖，自有岁寒心。』 - 张九龄 《感遇》',
        '『 暮从碧山下，山月随人归。却顾所来径，苍苍横翠微。』- 李白 《下终南山过斛斯山人宿置酒》',
        '『 我歌月徘徊，我舞影零乱。醒时同交欢，醉后各分散。永结无情游，相期邈云汉。』- 李白 《月下独酌》',
        '『 燕草如碧丝，秦桑低绿枝。当君怀归日，是妾断肠时。春风不相识，何事入罗帏。』- 李白 《春思》',
        '『 岱宗夫如何？齐鲁青未了。造化钟神秀，阴阳割昏晓。荡胸生曾云，决眦入归鸟。会当凌绝顶，一览众山小。』 - 杜甫 《望岳》',
        '『 明日隔山岳，世事两茫茫。』- 杜甫 《赠卫八处士》',
        '『 绝代有佳人，幽居在空谷。』- 杜甫 《佳人》',
        '『 下马饮君酒，问君何所之。君言不得意，归卧南山陲。但去莫复问，白云无尽时。』- 王维 《送别》',
        '『 床前明月光，疑是地上霜。举头望明月，低头思故乡。』 - 李白 《静夜思》',
        '『 终南阴岭秀，积雪浮云端。林证明霁色，城中增暮寒。』 - 祖咏 《终南望余雪》',
        '『 白日依山尽，黄河入海流。欲穷千里目，更上一层楼。』 - 王之涣 《登鹳雀楼》',
        '『 千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。』 - 柳宗元 《江雪》',
        '『 松下问童子，言师采药去。只在此山中，云深不知处。』 - 贾岛 《寻隐者不遇》',
        '『 江上往来人，但爱鲈鱼美。君看一叶舟，出没风波里。』 - 范仲淹 《江上渔者》',
        '『 生当作人杰，死亦为鬼雄。至今思项羽，不肯过江东。』 - 李清照 《夏日绝句》',
        '『 好雨知时节，当春乃发生。随风潜入夜，润物细无声。』 - 杜甫 《春夜喜雨》',
        '『 功盖三分国，名成八阵图。江流石不转，遗恨失吞吴。』 - 杜甫 《八阵图》',
        '『 江碧鸟逾白，山青花欲燃。今春看又过，何日是归年？』 - 杜甫 《绝句》',
        '『 空山不见人，但闻人语响。返影入深林，复照青苔上。』 - 王维 《鹿柴》',
        '『 荆溪白石出，天寒红叶稀。山路元无雨，空翠湿人衣。』 - 王维 《山中》',
        '『 独坐幽篁里，弹琴复长啸。深林人不知，明月来相照。』 - 王维 《竹馆里》',
        '『 人闲桂花落，夜静春山空。月出惊山鸟，时鸣春涧中。』 - 王维 《鸟鸣涧》',
        '『 山中相送罢，日暮掩柴扉。春草年年绿，王孙归不归。』 - 王维 《送别》',
        '『 红豆生南国，春来发几枝。愿君多采撷，此物最相思。』 - 王维 《相思》',
        '『 君自故乡来，应知故乡事。来日绮窗前，寒梅着花未。』 - 王维 《杂诗》',
        '『 移舟泊烟渚，日暮客愁新。野旷天低树，江清月近人。』 - 孟浩然 《宿建德江》',
        '『 春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。』 - 孟浩然 《春晓》',
        '『 绿蚁新醅酒，红泥小火炉。晚来天欲雪，能饮一杯无。』 - 白居易 《问刘十九》',
        '『 小娃撑小艇，偷采白莲回。不解藏踪迹，浮萍一道开。』 - 白居易 《池上》',
        '『 离离原上草，一岁一枯荣。野火烧不尽，春风吹又生。』 - 白居易 《草》',
        '『 向晚意不适，驱车登古原。夕阳无限好，只是近黄昏。』 - 李商隐 《登乐游原》',
        '『 日暮苍山远，天寒白屋贫。柴门闻犬吠，风雪夜归人。』 - 刘长卿 《逢雪宿芙蓉山主人》',
        '『 锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦。』 - 李绅 《锄禾》',
        '『 春种一粒粟，秋收万颗籽。四海无闲田，农夫犹饿死。』 - 李绅 《悯农》',
        '『 入春才七日，离家已二年。人归落雁后，思发在花前。』 - 隋·薛道衡 《人日思归》',
        '『 白发三千丈，缘愁似个长。不知明镜里，何处得秋霜。』 - 唐·李白 《秋浦歌》',
        '『 炉火照天地，红星乱紫烟。赧郎明月夜，歌曲动寒川。』 - 唐·李白 《秋浦歌》',
        '『 美人卷珠帘，深坐颦蛾眉。但见泪痕湿，不知心恨谁。』 - 唐·李白 《怨情》',
        '『 玉阶生白露，夜久侵罗袜。却下水精帘，玲珑望秋月。』 - 唐·李白 《玉阶怨》',
        '『 挽弓当挽强，用箭当用长。射人先射马，擒贼先擒王。』 - 唐·杜甫 《前出塞》',
        '『 危楼高百尺，手可摘星辰。不敢高声语，恐惊天上人。』 - 唐·李白 《夜宿山寺》',
        '『 迟日江山丽，春风花草香。泥融飞燕子，沙暖睡鸳鸯。』 - 唐·杜甫 《绝句》',
        '『 众鸟高飞尽，孤云独去闲。相看两不厌，只有敬亭山。』 - 唐·李白 《独坐敬亭山》',
        '『 怀君属秋夜，散步咏凉天。空山松子落，幽人应未眠。』 - 韦应物 《秋夜寄邱员外》',
        '『 众鸟高飞尽，孤云独去闲。相看两不厌，只有敬亭山。』 - 唐·李白 《独坐敬亭山》',
        '『 鸣筝金粟柱，素手玉房前。欲得周郎顾，时时误拂弦。』 - 唐·李端 《听筝》',
        '『 君自故乡来，应知故乡事。来日绮窗前，寒梅著花未。』 - 王维 《杂诗》',
        '『 归山深浅去，须尽丘壑美。莫学武陵人，暂游桃源里。』 - 裴迪 《送崔九》',
        '『 苍苍竹林寺，杳杳钟声晚。荷笠带斜阳，青山独归远。』 - 刘长卿 《送灵澈》',
        '『 泠泠七弦上，静听松风寒。古调虽自爱，今人多不弹。』 - 刘长卿 《弹琴》',
        '『 孤云将野鹤，岂向人间住。莫买沃洲山，时人已知处。』 - 刘长卿 《送上人》',
        '『 三日入厨下，洗手作羹汤。未谙姑食性，先遣小姑尝。』 - 王建 《新嫁娘》',
        '『 昨夜裙带解，今朝燕子飞。铅华不可弃，莫是藁砧归。』 - 权德舆 《玉台体》',
        '『 寥落古行宫，宫花寂寞红。白头宫女在，闲坐说玄宗。』 - 元稹 《行宫》',
        '『 故国三千里，深宫二十年。一声何满子，双泪落君前。』 - 张祜 《何满子》',
        '『 岭外音书绝，经冬复立春。近乡情更怯，不敢问来人。』 - 李频 《渡汉江》',
        '『 打起黄莺儿，莫教枝上啼。啼时惊妾梦，不得到辽西。』 - 金昌绪 《春怨》',
        '『 十年磨一剑，霜刃未曾试。今日把示君，谁有不平事。』- 唐·贾岛《剑客》',
        '『 此马非凡马，房星本是星。向前敲瘦骨，犹自带铜声。』- 唐·李贺《马诗》',
        '『 大漠山如雪，燕山月似钩。何当金络脑，快走踏清秋。』- 唐·李贺《马诗》',
        '『 解落三秋叶，能开二月花。过江千尺浪，入竹万竿斜。』- 唐·李贺《风》',
        '『 鹅，鹅，鹅，曲项向天歌。白毛浮绿水，红掌拨清波。』- 唐·骆宾王《咏鹅》',
        '『 墙角数枝梅，凌寒独自开。遥知不是雪，为有暗香来。』- 宋·王安石《梅花》',
        '『 慈母手中线，游子身上衣。临行密密缝，意恐迟迟归。谁言寸草心，报得三春晖。』- 唐·孟郊《游子吟》',
        '『 两个黄鹂鸣翠柳，一行白鹭上青天。窗含西岭千秋雪，门泊东吴万里船。』 - 杜甫 《绝句》',
        '『 夕阳度西岭，群壑倏已暝。松月生夜凉，风泉满清听。樵人归尽欲，烟鸟栖初定。之子期宿来，孤琴候萝径。』-孟浩然',
        '『 清溪深不测，隐处唯孤云。松际露微月，清光犹为君。茅亭宿花影，药院滋苔纹。余亦谢时去，西山鸾鹤群。』-常建',
        '『 连山若波涛，奔凑如朝东。青槐夹驰道，宫馆何玲珑。』-岑参 《与高适薛据登慈恩寺浮图》',
        '『 镜湖三百里，菡萏发荷花。素手青条上，红妆白日鲜。回舟不待月，归去越王家。』- 李白《子夜吴歌·夏歌》',
        '『 长安一片月，万户捣衣声。秋风吹不尽，总是玉关情。何日平胡虏，良人罢远征。』- 李白《子夜吴歌·秋歌》',
        '『 秦地罗敷女，采桑绿水边。素手青条上，红妆白日鲜。蚕饥妾欲去，五马莫留连。』- 李白《子夜吴歌·春歌》',
        '『 梧桐相待老，鸳鸯会双死。贞妇贵殉夫，舍生亦如此。波澜誓不起，妾心井中水。』- 孟郊 《列女操》',
        '『 慈母手中线，游子身上衣。临行密密缝，意恐迟迟归。谁言寸草心，报得三春晖。』- 孟郊 《游子吟》',
        '『 前不见古人，后不见来者。念天地之悠悠，独怆然而涕下。』-陈子昂 《登幽州台歌》 ',
        '『 苍苍竹林寺，杳杳钟声晚。 荷笠带斜阳，青山独归远。』- 刘长卿 《送灵澈上人》',
        '『 炼得身形似鹤形，千株松下两函经。 我来问道无余说，云在青天水在瓶。』- 李翱《赠药山高僧惟俨》 ',
        '『 横看成岭侧成峰，远近高低各不同。 不识庐山真面目，只缘身在此山中。』- 苏轼 《题西林壁》',
        '『 泉眼无声惜细流，树阴照水爱晴柔。 小荷才露尖尖角，早有蜻蜓立上头。』- 杨万里 《小池》',
        '『 半亩方塘一鉴开，天光云影共徘徊。 问渠那得清如许？为有源头活水来。』- 朱熹 《观书有感》',
        '『 昨夜江边春水生，艨艟巨舰一毛轻。向来枉费推移力，此日中流自在行。』- 朱熹 《观书有感》',
        '『 黄金华发两飘萧，六九童心尚未消。 叱起海红帘底月，四厢花影怒于潮。』- 龚自珍《梦中作四截句》 ',
        '『 众星罗列夜明深，岩点孤灯月未沉。 圆满光华不磨镜，挂在青天是我心。』- 寒山 《众星罗列》  ',
        '『 春有百花秋有月，夏有凉风冬有雪。 若无闲事挂心头，便是人间好时节。』- 慧开 《春有百花秋有月》 ',
        '『 溪花与禅意，相对亦忘言。』- 刘长卿',
        '『 竹下忘言对紫茶，全胜羽客醉流霞。 尘心洗尽兴难尽，一树蝉声片影斜。』- 钱起 《与赵莒茶宴》 ',
        '『 寒夜客来茶当酒，竹炉汤沸火初红。 寻常一样窗前月，才有梅花便不同。』- 杜耒 《寒夜》',
        '『 坐酌泠泠水，看煎瑟瑟尘。 无由持一碗，寄与爱茶人。』- 白居易 《山泉煎茶有怀》  ',
        '『 南州溽暑醉如酒，隐几熟眠开北牖。 日午独觉无馀声，山童隔竹敲茶臼。』- 柳宗元《夏昼偶作》 ',
        '『 茶饼嚼时香透齿，水沈烧处碧凝烟。 纱窗避著犹慵起，极困新晴乍雨天。』- 李涛 《春昼回文》',
        '『 乱飘僧舍茶烟湿，密洒歌楼酒力微。 江上晚来堪画处，渔人披得一蓑归。』- 郑谷《雪中偶题》 ',
        '『 九日山僧院，东篱菊也黄。 俗人多泛酒，谁解助茶香。』- 皎然《九日与陆处士羽饮茶》 ',
        '『 常记溪亭日暮，沉醉不知归路。兴尽晚回舟，误入藕花深处。争渡，争渡，惊起一滩鸥鹭。 』 - 李清照 《如梦令》 ',
        '『 渭城朝雨浥轻尘，客舍青青柳色新。 劝君更尽一杯酒，西出阳关无故人。 』- 王维《送元二使安西》 ',
        '『 葡萄美酒夜光杯，欲饮琵琶马上催。 醉卧沙场君莫笑，古来征战几人回？ 』- 王翰《凉州词》',
        '『 两人对酌山花开，一杯一杯复一杯。 我醉欲眠卿且去，明朝有意抱琴来。 』- 李白《山中与幽人对酌》 ',
        '『 清明时节雨纷纷，路上行人欲断魂。 借问酒家何处有？牧童遥指杏花村。 』 - 杜牧 《清明》 ',
        '『 秦时明月汉时关，万里长征人未还。 但使龙城飞将在，不教胡马度阴山。 』 - 王昌龄《出塞》 ',
        '『 烽火城西百尺楼，黄昏独上海风秋。 更吹羌笛关山月，无那金闺万里愁。』- 王昌龄 《从军行》 ',
        '『 琵琶起舞换新声，总是关山旧别情。 撩乱边愁听不尽，高高秋月照长城。』- 王昌龄 《从军行》',
        '『 关城榆叶早疏黄，日暮云沙古战场。 表请回军掩尘骨，莫教兵士哭龙荒。』- 王昌龄 《从军行》',
        '『 青海长云暗雪山，孤城遥望玉门关。 黄沙百战穿金甲，不破楼兰终不还。』- 王昌龄 《从军行》',
        '『 大漠风尘日色昏，红旗半卷出辕门。 前军夜战洮河北，已报生擒吐谷浑。』- 王昌龄 《从军行》',
        '『 胡瓶落膊紫薄汗，碎叶城西秋月团。 明敕星驰封宝剑，辞君一夜取楼兰。』- 王昌龄 《从军行》',
        '『 玉门山嶂几千重，山北山南总是烽。 人依远戍须看火，马踏深山不见踪。』- 王昌龄 《从军行》 ',
        '『 折戟沉沙铁未销，自将磨洗认前朝。 东风不与周郎便，铜雀春深锁二乔。』- 杜牧 《赤壁》 ',
        '『 回乐峰前沙似雪，受降城外月如霜。 不知何处吹芦管，一夜征人尽望乡。』- 李益 《夜上受降城闻笛》 ',
        '『 誓扫匈奴不顾身，五千貂锦丧胡尘。 可怜无定河边骨，犹是春闺梦里人。』- 陈陶 《陇西行》',
        '『 君不见，青海头，古来白骨无人收。新鬼烦冤旧鬼哭，天阴雨湿声啾啾。 』 - 杜甫 《兵车行》',
        '『 月黑雁飞高，单于夜遁逃。 欲将轻骑逐，大雪满弓刀。 』- 卢纶 《塞下曲》  ',
        '『 君不见沙场征战苦，至今犹忆李将军。 』 - 高适 《燕歌行》',
        '『 鹫翎金仆姑，燕尾绣蝥弧。 独立扬新令，千营共一呼。 』- 卢纶《塞下曲》',
        '『 林暗草惊风，将军夜引弓。 平明寻白羽，没在石棱中。 』- 卢纶《塞下曲》 ',
        '『 李白乘舟将欲行，忽闻岸上踏歌声。 桃花潭水深千尺，不及汪伦送我情。 』- 李白《赠汪伦》',
        '『 江水漾西风，江花脱晚红。 离情被横笛，吹过乱山东。 』- 王安石《江上》',
        '『 娉娉袅袅十三馀，豆蔻梢头二月初。 春风十里扬州路，卷上珠帘总不如。 』- 杜牧《赠别》 ',
        '『 多情却似总无情，唯觉樽前笑不成。 蜡烛有心还惜别，替人垂泪到天明。 』- 杜牧《赠别》',
        '『 归山深浅去，须尽丘壑美。 莫学武陵人，暂游桃源里。 』- 裴迪《崔九欲往南山马上口号与别》 ',
        '『 冰簟银床梦不成，碧天如水夜云轻。 雁声远过潇湘去，十二楼中月自明。 』- 温庭筠《瑶瑟怨》 ',
        '『 扬子江头杨柳春，杨花愁杀渡江人。 数声风笛离亭晚，君向潇湘我向秦。 』- 郑谷《淮上与友人别》 ',
        '『 城上斜阳画角哀，沈园非复旧池台。 伤心桥下春波绿，曾是惊鸿照影来。 』- 陆游《沈园》  ',
        '『 梦断香消四十年，沈园柳老不吹绵。 此身行作稽山土，犹吊遗踪一泫然。 』- 陆游《沈园》 ',
        '『 独在异乡为异客，每逢佳节倍思亲。 遥知兄弟登高处，遍插茱萸少一人。 』-  王维《九月九日忆山东兄弟》 ',
        '『 京口瓜洲一水间，钟山只隔数重山。春风又绿江南岸，明月何时照我还？ 』 - 王安石 《泊船瓜洲》',
        '『 洛阳城里见秋风，欲作家书意万重。 复恐匆匆说不尽，行人临发又开封。 』- 张籍 《秋思》 ',
        '『 黄河远上白云间，一片孤城万仞山。 羌笛何须怨杨柳，春风不度玉门关。 』- 王之涣《凉州词》 ',
        '『 少小离家老大回，乡音无改鬓毛衰。 儿童相见不相识，笑问客从何处来。 』- 贺知章《回乡偶书》 ',
        '『 移舟泊烟渚，日暮客愁新。 野旷天低树，江清月近人。 』- 孟浩然《宿建德江》 ',
        '『 长江悲已滞，万里念将归。 况属高风晚，山山黄叶飞。 』- 王勃 《山中》',
        '『 谁家玉笛暗飞声，散入春风满洛城。 此夜曲中闻折柳，何人不起故园情。 』- 李白《春夜洛城闻笛》',
        '『 故园东望路漫漫，双袖龙钟泪不干。 马上相逢无纸笔，凭君传语报平安。 』- 岑参《逢入京使》 ',
        '『 江碧鸟逾白，山青花欲燃。 今春看又过，何日是归年？ 』- 杜甫《绝句》 ',
        '『 家住孟津河，门对孟津口。 常有江南船，寄书家中否。 』- 王维 《杂诗》',
        '『 君自故乡来，应知故乡事。 来日绮窗前，寒梅著花未？ 』- 王维 《杂诗》 ',
        '『 已见寒梅发，复闻啼鸟声。 心心视春草，畏向玉阶生。 』- 王维 《杂诗》',
        '『 中庭地白树栖鸦，冷露无声湿桂花。 今夜月明人尽望，不知秋思落谁家？ 』- 王建《十五夜望月寄杜郎中》 ',
        '『 旅馆寒灯独不眠，客心何事转凄然？ 故乡今夜思千里，霜鬓明朝又一年。 』- 高适《除夜作》 ',
        '『 云淡风轻近午天，傍花随柳过前川。 时人不识余心乐，将谓偷闲学少年。 』- 程颢《春日偶成》 ',
        '『 云母屏风烛影深，长河渐落晓星沉。 嫦娥应悔偷灵药，碧海青天夜夜心。 』 - 李商隐《嫦娥》 ',
        '『 众鸟高飞尽，孤云独去闲。 相看两不厌，只有敬亭山。 』- 李白《独坐敬亭山》 ',
        '『 深院静，小庭空，断续寒砧断续风。无奈夜长人不寐，数声和月到帘栊。 』- 李煜《捣练子》 ',
        '『 前不见古人，后不见来者。 念天地之悠悠，独怆然而涕下。 』- 陈子昂《登幽州台歌》',
        '『 男儿何不带吴钩，收取关山五十州？ 请君暂上凌烟阁，若个书生万户侯？ 』- 李贺《南园十三首》 ',
        '『 更深月色半人家，北斗阑干南斗斜。 今夜偏知春气暖，虫声新透绿窗纱。 』- 刘方平《月夜》 ',
        '『 梅子金黄杏子肥，麦花雪白菜花稀。日长篱落无人过，惟有蜻蜓蛱蝶飞。 』- 范成大 《四时田园杂兴》',
        '『 山中相送罢，日暮掩柴扉。 春草明年绿，王孙归不归。 』- 王维《山中送别》 ',
        '『 千里黄云白日曛，北风吹雁雪纷纷。 莫愁前路无知己，天下谁人不识君。 』- 高适 《别董大》 ',
        '『 青山隐隐水迢迢，秋尽江南草未凋。 二十四桥明月夜，玉人何处教吹箫。 』- 杜牧《寄扬州韩绰判官》 ',
        '『 折花逢驿使，寄与陇头人。 江南无所有，聊赠一枝春。 』- 陆凯《赠范晔》 ',
        '『 寒雨连江夜入吴，平明送客楚山孤。 洛阳亲友如相问，一片冰心在玉壶。』- 王昌龄 《芙蓉楼送辛渐》',
        '『 丹阳城南秋海阴，丹阳城北楚云深。 高楼送客不能醉，寂寂寒江明月心。』- 王昌龄 《芙蓉楼送辛渐》',
        '『 下马饮君酒，问君何所之。 君言不得意，归卧南山陲。 但去莫复问，白云无尽时。 』- 王维《送别》 ',
        '『 嵩云秦树久离居，双鲤迢迢一纸书。 休问梁园旧宾客，茂陵秋雨病相如。 』- 李商隐《寄令狐郎中》 ',
        '『 十轮霜影转庭梧，此夕羁人独向隅。 未必素娥无怅恨，玉蟾清冷桂花孤。 』- 晏殊 中秋月 ',
        '『 春日在天涯，天涯日又斜。 莺啼如有泪，为湿最高花。 』- 李商隐《天涯》 ',
        '『 古人学问无遗力，少壮工夫老始成。 纸上得来终觉浅，绝知此事要躬行。 』- 陆游 《冬夜读书示子聿》 ',
        '『 飞来峰上千寻塔，闻说鸡鸣见日升。 不畏浮云遮望眼，自缘身在最高层。 』- 王安石 《登飞来峰》',
        '『 白日依山尽，黄河入海流。欲穷千里目，更上一层楼。 』- 王之涣 《登鹳雀楼》',
        '『 烟笼寒水月笼沙，夜泊秦淮近酒家。 商女不知亡国恨，隔江犹唱后庭花。 』- 杜牧 《泊秦淮》 ',
        '『 长安回望绣成堆，山顶千门次第开。一骑红尘妃子笑，无人知是荔枝来。』- 杜牧《过华清宫》 ',
        '『 新丰绿树起黄埃，数骑渔阳探使回。霓裳一曲千峰上，舞破中原始下来。』- 杜牧《过华清宫》',
        '『 万国笙歌醉太平，倚天楼殿月分明。云中乱拍禄山舞，风过重峦下笑声。 』- 杜牧《过华清宫》',
        '『 山围故国周遭在，潮打空城寂寞回。 淮水东边旧时月，夜深还过女墙来。 』- 刘禹锡《石头城》 ',
        '『 江雨霏霏江草齐，六朝如梦鸟空啼。 无情最是台城柳，依旧烟笼十里堤。 』- 韦庄《台城》 ',
        '『 沅湘流不尽，屈子怨何深！ 日暮秋风起，萧萧枫树林。 』- 戴叔伦《题三闾大夫庙》 ',
        '『 霜陨芦花泪湿衣，白头无复倚柴扉。 去年五月黄梅雨，曾典袈裟籴米归。 』- 与恭《思母》 ',
        '『 死去元知万事空，但悲不见九州同。 王师北定中原日，家祭无忘告乃翁。 』- 陆游《示儿》 ',
        '『 几日随风北海游，回从扬子大江头。 臣心一片磁针石，不指南方不肯休。 』 - 文天祥 《扬子江》 ',
        '『 千锤万凿出深山，烈火焚烧若等闲。 粉身碎骨全不顾，要留清白在人间。 』- 于谦《石灰吟》 ',
        '『 朱鹭，鱼以乌。路訾邪鹭何食？食茄下。不之食，不以吐，将以问诛者。』- 《朱鹭》',
        '『 在天愿作比翼鸟，在地愿为连理枝。天长地久有时尽，此恨绵绵无绝期。』- 白居易《长恨歌》',
        '『 三万里河东入海，五千仞岳上摩天。 遗民泪尽胡尘里，南望王师又一年。 』- 陆游《秋夜将晓出篱门迎凉有感》 ',
        '『 早岁那知世事艰，中原北望气如山。 楼船夜雪瓜洲渡，铁马秋风大散关。 塞上长城空自许，镜中衰鬓已先斑。 出师一表真名世，千载谁堪伯仲间！ 』- 陆游《书愤》 ',
        '『 风卷江湖雨暗村，四山声作海涛翻。 溪柴火软蛮毡暖，我与狸奴不出门。 』- 陆游《十一月四日风雨大作》 ',
        '『 耕犂千亩实千箱，力尽筋疲谁复伤。 但愿众生皆得饱，不辞羸病卧残阳。 』- 李纲《病牛》 ',
        '『 操吴戈兮被犀甲，车错毂兮短兵接。 旌蔽日兮敌若云，矢交坠兮士争先。 凌余阵兮躐余行，左骖殪兮右刃伤。 霾两轮兮絷四马，援玉枹兮击鸣鼓。 天时怼兮威灵怒，严杀尽兮弃原野。 出不入兮往不反，平原忽兮路超远。 带长剑兮挟秦弓，首身离兮心不惩。 诚既勇兮又以武，终刚强兮不可凌。 身既死兮神以灵，魂魄毅兮为鬼雄。 』- 屈原《楚辞·九歌·其十·国殇》 ',
        '『 樱桃落尽春归去，蝶翻金粉双飞。子规啼月小楼西，玉钩罗幕，惆怅暮烟垂。 别巷寂寥人散后，望残烟草低迷。炉香闲袅凤凰儿，空持罗带，回首恨依依。 』- 李煜 《临江仙·樱桃落尽春归去》',
        '『 郁孤台下清江水，中间多少行人泪。西北望长安，可怜无数山。 青山遮不住，毕竟东流去。江晚正愁余，山深闻鹧鸪。 』- 辛弃疾《菩萨蛮·书江西造口壁》 ',
        '『 浩荡离愁白日斜，吟鞭东指即天涯。 落红不是无情物，化作春泥更护花。 』- 龚自珍《己亥杂诗》 ',
        '『 望门投止思张俭，忍死须臾待杜根。 我自横刀向天笑，去留肝胆两昆仑。 』- 谭嗣同《狱中题壁》 ',
        '『 病骨支离纱帽宽，孤臣万里客江干。 位卑未敢忘忧国，事定犹须待阖棺。 天地神灵扶庙社，京华父老望和銮。 出师一表通今古，夜半挑灯更细看。 』- 陆游《病起书怀》',
        '『 和戎诏下十五年，将军不战空临边。 朱门沉沉按歌舞，厩马肥死弓断弦。 戍楼刁斗催落月，三十从军今白发。 笛里谁知壮士心，沙头空照征人骨。 中原干戈古亦闻，岂有逆胡传子孙。 遗民忍死望恢复，几处今宵垂泪痕。 』- 陆游《关山月》 ',
        '『 白发萧萧卧泽中，只凭天地鉴孤忠。 阨穷苏武餐毡久，忧愤张巡嚼齿空。 细雨春芜上林苑，颓垣夜月洛阳宫。 壮心未与年俱老，死去犹能作鬼雄。 』- 陆游《书愤》 ',
        '『 镜里流年两鬓残，寸心自许尚如丹。衰迟罢试戎衣窄，悲愤犹争宝剑寒。远戍十年临的博，壮图万里战皋兰。关河自古无穷事，谁料如今袖手看。 』- 陆游《书愤》',
        '『 风萧萧兮易水寒，壮士一去兮不复还。 - 荆轲 《易水歌》 ',
        '『 方领蕙带折角巾，杜若已老兰苕春。 南山削秀蓝玉合，小雨归去飞凉云。 熟杏暖香梨叶老，草梢竹栅锁池痕。 郑公乡老开酒尊，坐泛楚奏吟招魂。 』- 李贺《南园》',
        '『 军门频纳受降书，一剑横行万里馀。 汉祖谩夸娄敬策，却将公主嫁单于。 』- 戴叔伦 《塞上曲》',
        '『 汉家旌帜满阴山，不遣胡儿匹马还。愿得此身长报国，何须生入玉门关。 』- 戴叔伦 《塞上曲》',
        '『 匈奴犹未灭，魏绛复从戎。 怅别三河道，言追六郡雄。 雁山横代北，狐塞接云中。 勿使燕然上，惟留汉将功。 』- 陈子昂《送魏大从军》 ',
        '『 先天下之忧而忧，后天下之乐而乐乎！噫！微斯人，吾谁与归！ 』- 范仲淹 《岳阳楼记》',
        '『 号令风霆迅，天声动北陬。 长驱渡河洛，直捣向燕幽。 马蹀阏氏血，旗枭克汗头。 归来报明主，恢复旧神州。 』- 岳飞《送紫岩张先生北伐》 ',
        '『 花近高楼伤客心，万方多难此登临。 锦江春色来天地，玉垒浮云变古今。 北极朝廷终不改，西山寇盗莫相侵。 可怜后主还祠庙，日暮聊为梁父吟。 』- 杜甫《登楼》 ',
        '『 三年羁旅客，今日又南冠。 无限山河泪，谁言天地宽？ 已知泉路近，欲别故乡难。 毅魄归来日，灵旗空际看。 』- 夏完淳《别云间》 ',
        '『 十载驱驰海色寒，孤臣于此望宸銮。 繁霜尽是心头血，洒向千峰秋叶丹。 』- 戚继光《望阙台》',
        '『 军歌应唱大刀环，誓灭胡奴出玉关。 只解沙场为国死，何须马革裹尸还。 』- 徐锡麟《出塞》',
        '『 酒酣看剑凛生风，身是天涯一秃翁。 扪虱剧谈空自许，闻鸡浩叹与谁同。 玉关岁晚无来使，沙苑春生有去鸿。 人寿定非金石永，可令虚死蜀山中。 』- 陆游《病起书怀》 ',
        '『 草合离宫转夕晖，孤云飘泊复何依。 山河风景元无异，城郭人民半已非。 满地芦花和我老，旧家燕子傍谁飞。 从今别却江南路，化作啼鹃带血归。 』- 文天祥《金陵驿》 ',
        '『 腰间羽箭久凋零，太息燕然未勒铭。 老子犹堪绝大漠，诸君何至泣新亭。 一身报国有万死，双鬓向人无再青。 记取江湖泊船处，卧闻新雁落寒汀。 』- 陆游《夜泊水村》 ',
        '『 常记溪亭日暮，沉醉不知归路。兴尽晚回舟，误入藕花深处。争渡，争渡，惊起一滩鸥鹭。 』- 李清照《如梦令》 ',
        '『 万帐穹庐人醉，星影摇摇欲坠。归梦隔狼河，又被河声搅碎。还睡，还睡，解道醒来无味。 』- 纳兰性德 《如梦令》',
        '『 一抹斜阳沙觜，几点闲鸥草际，乌榜小渔舟，摇过半江秋水。风起，风起，棹入白苹花里。 』- 刘基 《如梦令》',
        '『 正是辘轳金井，满砌落花红冷。蓦地一相逢，心事眼波难定。谁省，谁省，从此簟纹灯影。 』- 纳兰性德 《如梦令》',
        '『 莺嘴啄花红溜，燕尾点波绿皱。指冷玉笙寒，吹彻小梅春透。依旧，依旧，人与绿杨俱瘦。 』- 秦观 《如梦令》',
        '『 道是梨花不是。道是杏花不是。白白与红红，别是东风情味。曾记。曾记。人在武陵微醉。 』- 严蕊 《如梦令》',
        '『 九七门开八脉。洞达永无相隔。浑似吐氤氲，运转周回素白。难测。难测。一点当中堪赫。 』- 王哲 《如梦令》',
        '『 九九八方端锁。团聚光明如火。焰焰做红霞，里面天花遍妥。成裹。成裹。莹莹明珠一颗。 』- 王哲 《如梦令》',
        '『 九九明词要正。修整亘初元性。须是返阳阴，决作清吟雅咏。贤圣。贤圣。容许陈如梦令。 』- 王哲 《如梦令》',
        '『 檐耸数株松子。村绕一湾菰米。鸥外迥闻鸡，望望云山烟水。多此。多此。酒进玉盘双鲤。 』- 王逢 《如梦令》',
        '『 明月古今长有。怎奈华宗海口。黑窟里头居。黯不分夜昼。吾友。吾友。问你如何下手。  』- 王哲 《如梦令》',
        '『 坐卧住行有别。自是逍遥做彻。大道本来真，蓦地哂中欢悦。无说。无说。勘破春花秋月。 』- 王哲 《如梦令》',
        '『 频日雅欢幽会，打得来来越㬠。说著暂分飞，蹙损一双眉黛。无奈，无奈，两个心儿总待。 』- 白居易《如梦令·宴桃源》',
        '『 落月西窗惊起，好个匆匆些子。鬒鬓亸轻松，凝了一双秋水。告你，告你，休向人间整理。 』- 白居易《如梦令·宴桃源》',
        '『 旧日酴醾时候。酒涴粉香襟袖。老去惜春心，试问孙郎知否。 花瘦。花瘦。剪取一枝重嗅。 』- 周紫芝《宴桃源·其四·与孙祖恭求酴醾》 ',
        '『 前度小花静院，不比寻常时见。见了又还休，愁却等闲分散。 肠断，肠断，记取钗横鬓乱。 』- 白居易 《宴桃源》 ',
        '『 蝶梦初回栩栩。柳岸几声莺语。苹末起微风，山外一川烟雨。 凝顾。凝顾。人在玉壶深处。 』- 米友仁《宴桃源/如梦令》 ',
        '『 落日霞消一缕。素月棱棱微吐。何处夜归人，呕嗄几声柔橹。 归去。归去。家在烟波深处。 』- 无名氏《如梦令》',
        '『 风急柳花飞骤。白尽千林万岫。樵担晚来归，正在栖鸦啼后。知否。知否。语到谢娘诗就。 』 - 王之道 《如梦令》',
        '『 遥指汤泉西路。隐约碧云天暮。宿鸟择深枝，两两相呼如语。凝伫。凝伫。今夜梦魂何处。 』- 王之道 《如梦令》',
        '『 黄叶声迟风歇。龛火夜寒明灭。残月却多情，来照先生归辙。清绝。清绝。透隙飞霜似雪。 』- 王之道 《如梦令》',
        '『 水外漫山桃李。那得个中风味。一种最怜渠，酒著佳人半醉。还似。还似。惊起午窗春睡。 』- 王之道 《如梦令》',
        '『 帘幕疏疏风透。庭下月寒花瘦。宽尽沈郎衣，方寸不禁僝僽。难受。难受。灯暗月斜时候。 』- 周紫芝 《如梦令》',
        '『 林外野塘烟腻。衣上落梅香细。瘦马步凌兢，人在乱山丛里。憔悴。憔悴。回望小楼千里。 』- 周紫芝 《如梦令》',
        '『 绿尽小池芳草。门外柳垂春昼。花上雨廉纤，帘幕燕来时候。消瘦。消瘦。依约粉香襟袖。 』- 周紫芝 《如梦令》',
        '『 闲倚琐窗工绣。春困两眉频皱。独自下香街，攀折画桥烟柳。晴昼。晴昼。偏称玉楼歌酒。 』- 陈允平 《如梦令》',
        '『 何处春风归路。金屋空藏樊素。零乱海棠花，愁梦欲随春去。情绪。情绪。粉溅两行冰箸。 』- 陈允平 《如梦令》',
        '『 飞雪舞稀还骤。高阁下临群岫。独立遂移时，归去黄昏前后。知否。知否。落笔骚人赋就。 』- 王之道 《如梦令》',
        '『 陕右人人听我。福地好修因果。天下不如斯，贫富一般行坐。轻可。轻可。轻可骄奢太过。 』- 丘处机 《如梦令》',
        '『 今夜盛排筵宴。准拟寻芳一遍。春去已多时，问甚红深红浅。不见。不见。还你一方白绢。 』- 袁介 《如梦令》',
        '『 故友全无一信。独坐古岩谁问。回首返江乡，散瑞漂萍相近。愁恨。愁恨。一叶风帆轻送。 』- 侯善渊 《如梦令》',
        '『 静默两家茅舍。特地月明狼藉。不管候虫吟，高枕北窗清夜。清夜。清夜。凉似樊川水榭。 』- 张雨 《如梦令》',
        '『 又是青春将暮。望极桃溪归路。洞户悄无人，空锁一庭红雨。凝伫。凝伫。人面不知何处。 』- 晁端礼 《如梦令》',
        '『 有泪绿窗偷洒。有恨锦笺难写。消瘦不胜春，玉骨都无一把。风雅。风雅。正值文君新寡。 』- 许有壬 《如梦令》',
        '『 昨夜庭梧陨翠。诗思尤便爽气。无事要生悲，可笑宋家多事。衰矣。衰矣。但校邻翁酒味。 』- 许有壬 《如梦令》',
        '『 绿锦峰峦似绣。曲折一渠冰溜。中有养疴人，敧枕北窗清昼。清昼。清昼。胡蝶还知梦否。 』- 张雨 《如梦令》',
        '『 薄雾浓云愁永昼，瑞脑销金兽。佳节又重阳，玉枕纱厨，半夜凉初透。东篱把酒黄昏后，有暗香盈袖。莫道不销魂，帘卷西风，人比黄花瘦。 』- 李清照《醉花阴》 ',
        '『 梳裹登楼春起早。新绿池塘草。日日误寻芳，细雨丝风，断续何时了。商量半臂铺绵少。花勒微寒峭。卦里问归期，越是多情，越是多烦恼。 』- 于懿 《醉花阴》',
        '『 月照红墙银汉皎，云去青山小。别院晚追凉，弄彻瑶笙，越觉花阴悄。琼浆满酌开怀抱，醉里乾坤好。暗麝夜香清，宝髻逢迎，暑向冰纨少。 』- 吴绮 《醉花阴》',
        '『 吹笛语儿城下路。帆卸明湖树。城上月蒙蒙。城下垂杨，尚湿前朝雨。自检麝囊灯畔觑。费尽闲情绪。无赖是秋鸿，但写人人，不写人何处。 』- 周星誉 《醉花阴》',
        '『 小步闲庭香馥馥。柳眼新垂绿。游赏共谁欢，寂寞今春，只是调莺熟。 银筝错乱难成曲。纤手临池浴。昨夜梦中归，自向花前，暗掷金钱卜。』- 徐元瑞 《醉花阴·卜归》 ',
        '『 一炷芙蓉熏寝昼。倦卧偎驯兽。红药醉东风，宿酒延酲，荡漾春心透。寻思梦里相逢后。有旧香沾袖。却恼蝶纷飞，花底撩情，不管人消瘦。 』- 吴湖帆 《醉花阴》',
        '『 拼却无聊微带醉。寒压罗衾翠。香圃落花深。雨点风声。迸乱惊侬睡。谯楼更鼓分明在。听彻声声泪。莫道不须愁，愁已深时，消却非容易。 』- 吕采芝 《醉花阴》',
        '『 烟水波深桃叶渡，又送君南浦。终古夕阳痕，六代江山，合让词人住。垂杨旧巷经行处，道是台城路。燕去入谁家，荠麦颓垣，莫顾雕梁误。 』- 宋育仁 《醉花阴》',
        '『 策骑河边初放溜。风暖吹冰皱。染柳更薰梅，百样生新，只有春如旧。西山遥望峰尖瘦，绿锁林梢秀。风定晚来天，波湿残红，浸得斜阳透。 』- 周寿昌 《醉花阴》',
        '『 风卷残红和梦碎。梦也伤憔悴。追想梦如何，梦不分明，梦醒还如醉。夕阳影里重门闭。别有销魂地。怎样卜销魂，要不销魂，恨少留春计。 』- 宗婉 《醉花阴》',
        '『 小雨乍晴天气冷。渐渐清明近。断梦去无踪，似趁游丝，飞过秋千顶。年时只恁恹恹病。更旧愁新恨。人静一庭闲，荡破斜阳，响落风筝影。 』- 庄盘珠 《醉花阴》',
        '『 绣幄笼寒穿小径，帘外微风定。劝酒碧笙娇，玉漏将残，如梦如春令。 青衫江上凭谁赠，艳曲连宵听。久已割柔肠，翠影侵人，添却当年病。 』- 曹溶 《醉花阴》',
        '『 疏影一枝风袅袅。暗送寒香小。浅水照横斜，高士山中，春色生多少。黄昏孤枕江声悄。新月窥人好。遥忆绮窗前，晴雪霏霏，银蒜垂帘早。 』- 梁清标 《醉花阴》',
        '『 独处无郎良夜误。宋玉东墙住。红豆是前身，粒粒相思，谁复卿卿误。旧时为雨为云处。分手天如雾。只有梦堪勋，梦到醒时，更不堪云雨。 』- 宁调元 《醉花阴》',
        '『 微含清露真珠滴。怯晓寒脉脉。秉烛倚雕栏，今日尊前，尽是多情客。从来应与春相得。有动人标格。半笑倚春风，醉脸生红，不是胭脂色。 』- 沈蔚 《醉花阴》',
        '『 黄花谩说年年好，也趁秋光老。绿鬓不惊秋，若斗尊前，人好花堪笑。蟠桃结子知多少，家住三山岛。何日跨归鸾，沧海飞尘，人世因缘了。 』- 辛弃疾 《醉花阴》',
        '『 守着灯儿红一颗。独自西窗坐。没得素心人，欲说无聊，只有梅花我。今宵真个能来么。奈梦都难做。比月旧时圆，钩起离愁，不醉如何躲。 』- 何振岱 《醉花阴》',
        '『 春花秋月何时了，往事知多少。小楼昨夜又东风，故国不堪回首月明中。雕栏玉砌应犹在，只是朱颜改。问君能有几多愁，恰似一江春水向东流。 』 - 李煜 《虞美人》',
        '『 少年听雨歌楼上，红烛昏罗帐。壮年听雨客舟中，江阔云低断雁、叫西风。而今听雨僧庐下，鬓已星星也。悲欢离合总无情，一任阶前点滴、到天明。 』 - 蒋捷 《虞美人》',
        '『 银床淅沥青梧老，屧粉秋蛩扫。采香行处蹙连钱，拾得翠翘何恨不能言。回廊一寸相思地，落月成孤倚。背灯和月就花阴，已是十年踪迹十年心。 』- 纳兰性德 《虞美人》',
        '『 弄梅骑竹嬉游日，门户初相识。未能羞涩但娇痴，却立风前散发衬凝脂。近来瞥见都无语，但觉双眉聚。不知何日始工愁，记取那回花下一低头。 』- 王国维 《虞美人》',
        '『 落花已作风前舞，又送黄昏雨。晓来庭院半残红，惟有游丝，千丈袅晴空。殷勤花下同携手，更尽杯中酒。美人不用敛蛾眉，我亦多情，无奈酒阑时。 』 - 叶梦得 《虞美人》',
        '『 芙蓉落尽天涵水，日暮沧波起。背飞双燕贴云寒，独向小楼东畔、倚阑看。 浮生只合尊前老，雪满长安道。故人早晚上高台，赠我江南春色、一枝梅。 』- 舒亶 《虞美人》',
        '『 碧苔深锁长门路。总为蛾眉误。自来积毁骨能销。何况真红一点臂砂娇。妾身但使分明在。肯把朱颜悔。从今不复梦承恩。且自簪花坐赏镜中人。 』- 王国维 《虞美人》',
        '『 风回小院庭芜绿，柳眼春相续。凭阑半日独无言，依旧竹声新月似当年。笙歌未散尊罍在，池面冰初解。烛明香暗画堂深，满鬓青霜残雪思难任。 』- 李煜 《虞美人·春怨》',
        '『 曲阑干外天如水，昨夜还曾倚。初将明月比佳期，长向月圆时候、望人归。罗衣著破前香在，旧意谁教改。一春离恨懒调弦，犹有两行闲泪、宝筝前。 』- 晏几道 《虞美人》',
        '『 湖山信是东南美，一望须千里。使君能得几回来？便使樽前醉倒、更徘徊。沙河塘里灯初上，《水调》谁家唱？夜阑风静欲归时，惟有一江明月、碧琉璃。 』- 苏轼 《虞美人》',
        '『 曲阑深处重相见，匀泪偎人颤。凄凉别后两应同，最是不胜清怨月明中。半生已分孤眠过，山枕檀痕涴。忆来何事最销魂，第一折枝花样画罗裙。 』- 纳兰性德 《虞美人》',
        '『 愁痕满地无人省，露湿琅玕影。闲阶小立倍荒凉。还剩旧时月色在潇湘。薄情转是多情累，曲曲柔肠碎。红笺向壁字模糊，忆共灯前呵手为伊书。 』- 纳兰性德 《虞美人》',
        '『 害风饮水知多少。因此通玄妙。白麻衲袄布青巾。好模好样，真个好精神。不须镜子前来照。事事心头了。梦中识破梦中身。便是逍遥、达彼岸头人。 』- 王哲 《虞美人》',
        '『 四郎须是安炉灶。莫把身心闹。玲珑便是本来真。气精养住，便得好精神。汞铅得得知颠倒。方见无名道。今宵饮酒是何人。认取清风明月日相亲。 』- 王重阳 《虞美人》',
        '『 几年不见凌波步。只道乘风去。山寒岁晚碧云寒。惊见飘萧翠袖倚琅玕。玉盘承露金杯劝。几度和香咽。冰霜如许自精神。知是仙姿不污世间尘。 』- 邵亨贞 《虞美人》',
        '『 相辉瑜珥瑶钗凤。宝翼蜻蜓动。新妆又得水苍梳。人道秋风何物不琼踞。人无玉质容何害。玉德斯堪爱。尚惭犹未十分全。听取明年环佩戛璆然。 』- 姚燧 《虞美人》',
        '『 西溪十里渔村路，犹记看梅处。暗香疏影最关情，更怜雪外一枝横，雨初晴。而今别去梅花久，梅好应如旧。风霜愧我渐苍颜，长教老鹤怨空山，几时还。 』- 吴邦桢 《虞美人》',
        '『 歌唇乍启尘飞处。翠叶轻轻举。似通舞态逞妖容。嫩条纤丽玉玲珑。怯秋风。虞姬珠碎兵戈里。莫认埋魂地。只应遗恨寄芳丛。露和清泪湿轻红。古今同。 』- 文珏 《虞美人》',
        '『 游人莫笑东园小。莫问花多少。一枝半朵恼人肠。无限姿姿媚媚、倚斜阳。二分春去知何处。赖是无风雨。更将绣幕密遮花。任是东风急性、不由他。 』- 毛滂 《虞美人》',
        '『 阶前嫩绿和愁长，坐忆眠还想。花红破梦似相怜，起望小林残萼、损容颜。双莺又向愁人絮，春也知归去。个人只是不思家，生却杨花心性、落天涯。 』- 沈际飞 《虞美人》',
        '『 冰肌玉骨，自清凉无汗。水殿风来暗香满。绣帘开，一点明月窥人，人未寝，欹枕钗横鬓乱。 起来携素手，庭户无声，时见疏星渡河汉。试问夜如何？夜已三更，金波淡，玉绳低转。细屈指西风几时来？又不道、流年暗中偷换。 』- 苏轼《洞仙歌》',
        '『 雪云散尽，放晓晴庭院。杨柳于人便青眼。更风流多处，一点梅心，相映远，约略颦轻笑浅。 一年春好处，不在浓芳，小艳疏香最娇软。到清明时候，百紫千红花正乱，已失春风一半。早占取、韶光共追游，但莫管春寒，醉红自暖。 』- 李元膺《洞仙歌》 ',
        '『 青烟幂处，碧海飞金镜。永夜闲阶卧桂影。露凉时，零乱多少寒螀，神京远，惟有蓝桥路近。水晶帘不下，云母屏开，冷浸佳人淡脂粉。待都将许多明，付与金尊，投晓共流霞倾尽。更携取胡床上南楼，看玉做人间，素秋千顷。 』- 晁补之《洞仙歌》',
        '『 莺莺燕燕。本是于飞伴。风月佳时阻幽愿。但人心坚固后，天也怜人，相逢处、依旧桃花人面。 绿窗携手，帘幕重重，烛影摇红夜将半。对尊前如梦，欲语魂惊，语未竟、已觉衣襟泪满。我只为、相思特特来，这度更休推，后回相见。 』- 蔡伸《洞仙歌》 ',
        '『 疏枝冷蕊，腊前时初破。年后才多玉妃堕。问梅轩白发，寂对空株，期三百六十，谁同幽坐。 孔方兄善幻，半幅溪藤，貌出缁尘素衣涴。当盛暑展图看，遽失炎蒸，甚欲摘倾筐三个。又却被、旁人劝休休，怕他日盐羹，凤毛无和。 』- 姚燧 《洞仙歌·对梅》 ',
        '『 千魔万难，苦海沉沦惯。枷锁浑身强牵挽。认檐溜、一点浮沤来又去，识不破、空华虚幻。便酩酊朝昏，又谁知在本有真灵，万尘羁绊。 梦回酒醒，子细开青眼。闲里光阴着心看。髑髅元不会东西，还戏弄、千古轮回无限。但省后收心便归来，莫只待西山，日沉天晚。 』姬翼《洞仙歌》 ',
        '『 晚风收暑，小池塘荷净。独倚胡床酒初醒。起徘徊、时有香气吹来，云藻乱，叶底游鱼动影。 空擎承露盖，不见冰容，惆怅明妆晓鸾镜。后夜月凉时，月淡花低，幽梦觉、欲凭谁省。且应记、临流凭阑干，便遥想，江南红酣千顷。 』- 刘光祖《洞仙歌·荷花》 ',
        '『 百花潭上，但荒烟秋草。犹想君家屋乌好。记当年，远道华发归来，妻子冷，短褐天吴颠倒。 卜居少尘事，留得囊钱，买酒寻花被春恼。造物亦何心，枉了贤才，长羁旅、浪生虚老。却不解消磨尽诗名，百代下，令人暗伤怀抱。 』- 李齐贤《洞仙歌·杜子美草堂》 ',
        '『 秋光海底，涌出银盘烂。只怕微云淡河汉。料姮娥应笑、醉舞仙人，今夜里，空恁樽前撩乱。 寻常三五夜，也有团圆，争柰人心未能满。记当初破镜、飞上天时，双照影、留得人闲一半。待仗他玉斧、再修成，问明月明年、共谁同看。 』- 李俊民《洞仙歌·中秋》 ',
        '『 一重山，两重山。山远天高烟水寒，相思枫叶丹。 菊花开，菊花残。塞雁高飞人未还，一帘风月闲。 』- 李煜《长相思·一重山》 ',
        '『 一尺深红胜曲尘，天生旧物不如新。 合欢桃核终堪恨，里许元来别有人。』- 温庭筠 《杨柳枝》',
        '『 井底点灯深烛伊，共郎长行莫围棋。玲珑骰子安红豆，入骨相思知不知。』- 温庭筠 《杨柳枝》',
        '『 长相思，长相思。若问相思甚了期，除非相见时。 长相思，长相思。欲把相思说似谁，浅情人不知。』- 晏几道 《长相思》',
        '『 空山不见人，但闻人语响。 返景入深林，复照青苔上。』-王维 《鹿柴》',
        '『 艅艎何泛泛，空水共悠悠。 阴霞生远岫，阳景逐回流。 蝉噪林逾静，鸟鸣山更幽。 此地动归念，长年悲倦游。』-王籍《入若耶溪》 ',
        '『 菩提只向心觅，何劳向外求玄？ 听说依此修行，西方只在目前。』- 惠能 《菩提偈》 ',
        '『 菩提本无树，明镜亦非台。本来无一物，何处惹尘埃。』-慧能 《菩提偈》',
        '『 木末芙蓉花，山中发红萼。 涧户寂无人，纷纷开且落。』-王维 《辛夷坞》',
        '『 独怜幽草涧边生，上有黄鹂深树鸣。 春潮带雨晚来急，野渡无人舟自横。』-韦应物 《滁州西涧》  ',
        '『 月落乌啼霜满天，江枫渔火对愁眠。 姑苏城外寒山寺，夜半钟声到客船。』-张继 《枫桥夜泊》 ',
        '『 胜日寻芳泗水滨，无边光景一时新。 等闲识得东风面，万紫千红总是春。』-朱熹 《春日》 ',
        '『 问余何意栖碧山，笑而不答心自闲。 桃花流水窅然去，别有天地非人间。』-李白 《山中问答》 ',
        '『 有德必有勇，正直的人绝不胆怯。』— 莎士比亚',
        '『 即使慢，驰而不息，纵会落后，纵会失败，但一定可以达到他所向的目标。』— 鲁迅',
        '『 勇敢寓于灵魂之中，而不单凭一个强壮的躯体。』— 卡赞扎基',
        '『 没有伟大的意志力，就不可能有雄才大略。』— 巴尔扎克',
        '『 与人相处要牢记“默”字；与家相处要牢记“忍”字；与世相处要牢记“宽”字。』',
        '『 在胆小怕事和优柔寡断的人眼中，一切事情都是不可能办到的。』— 司各特',
        '『 放下过去的烦恼，不耽忧未来，不执著现在，你的内心就会平静。』',
        '『 勇气通往天堂，怯懦通往地狱。』— 塞内加',
        '『 不作什么决定的意志不是现实的意志；无性格的人从来不作出决定。』— 黑格尔',
        '『 任何人都是自己行为的镜子！看他人的优点，自我鞭策；看他人的缺点，反省自己。』',
        '『 痛苦有个限度，恐惧则绵绵无际。』— 浦利尼斯二世',
        '『 大雪压青松，青松挺且直，要知松高洁，待到雪化时。』— 陈毅',
        '『 有坚强的意志，才有伟大的生活。』— 英国',
        '『 锲而舍之，朽木不折；锲而不舍，金石可镂。』— 荀况',
        '『 没有不冒风险就能克服的风险。』— 皮布里吕斯让·诺安',
        '『 咬住青山不放松，立根原在破岩中；千磨万击还坚劲，任尔东西南北风。』— 郑板桥',
        '『 谁有历经千辛万苦的意志，谁就能达到任何目的。』— 米南德',
        '『 英雄就是对任何事都有全力以赴，自始至终，心无旁骛的人。』— 波德莱尔',
        '『 恐惧与勇敢近在咫尺，而且互相共存— 向敌阵突进的人，最晓得个中实情。』— 棱罗',
        '『 如果没有勇气远离海岸线，长时间在海上孤寂地漂流，那么你绝不可发现新大陆。』— 纪德',
        '『 困难只能吓倒懦夫懒汉，而胜利永远属于敢于攀登科学高峰的人。』— 茅以升',
        '『 临着一切不平常的急难，只有勇敢和坚强才能拯救。』— 沙甫慈伯',
        '『 顽强的毅力可以征服世界上任何一座高峰。』— 狄更斯',
        '『 天堂和地狱，都是由心和行为所造作的。我们不要怕地狱，要怕的是心的偏向。』',
        '『 冒险是历史富有生命力的元素，无论是对个人还是社会。』— 威谦·博利多',
        '『 当一个人一心一意做好事情的时候，他最终是必然会成功的。』— 卢梭',
        '『 大胆产生勇气，多疑却产生恐惧。』— 康拉德',
        '『 心是最大的骗子。别人骗你一时，它却骗你一辈子。』',
        '『 美不是出现在自己的镜子里，而是出现在别人的眼睛里。』',
        '『 经验告诉我们，停留在不愉快情绪的时间越长，会大量降低我们解决问题的整体能力。』',
        '『 谁中途动摇信心，谁就是意志薄弱者；谁下定决心后，缺少灵活性，谁就是傻瓜。』— 诺尔斯',
        '『 意志引人入坦途，悲伤陷人于迷津。』— 埃·斯宾塞',
        '『 说谎的人必须有很好的记忆力。』',
        '『 意志命运往往背道而驰，决心到最后会全部推倒。』— 莎士比亚',
        '『 卑怯的人，即使有万丈的愤火，除弱草以外，又能烧掉什么呢？』— 鲁迅',
        '『 并非有钱就是快乐，问心无愧心最安。』',
        '『 不懂得害怕的人不能算勇敢，因为勇敢指的是面对一切风云变幻坚强不屈的能力。』— 里欧·罗斯顿',
        '『 勇敢里面有天才，力量和魔法。』— 歌德',
        '『 混乱生起的地方，也是宁静生起的地方。透过智慧，哪里有混乱，哪里就有宁静。』',
        '『 胜利属于最坚忍的人。』— 拿破仑',
        '『 原谅别人才能释放自己。』',
        '『 就是有九十九个困难，只要有一个坚强的意志就不困难。』— 杨根思',
        '『 万事皆由人的意志创造。』— 普劳图斯',
        '『 一旦有了意志，脚步也会轻松起来。』— 欧洲',
        '『 勇敢的人以生命冒险，不以良心冒险。』— 希拉',
        '『 憎恨是心的疯狂。』',
        '『 在全人类中，凡是坚强，正直，勇敢，仁慈的人，都有是英雄！』— 贝多芬',
        '『 一切痛苦能够毁灭人，然而受苦的人也能把痛苦消灭！』— 拜伦',
        '『 没有意志的人，一切感到困难，没有头脑的人，一切都感到简单。』— 朝鲜',
        '『 耐心和持久胜过激烈和狂热。』— 拉·封丹（法国寓言诗人）',
        '『 阴暗处长不出大树，人类也是一样，心胸必须如阳光般光明灿烂。』',
        '『 你想有所作为吗？那么坚定地走下去吧！后爱退只会使你意志衰退。』— 罗·赫里克',
        '『 “拿出胆量来”那一吼声是一切成功之母。』— 雨果',
        '『 哪里有意志存在，哪里就会有出路。』— 德国',
        '『 青山遮不住，毕竟东流去。』— 辛弃疾',
        '『 意志坚强的人能把世界放在手中像泥块一样任意揉捏。』— 歌德',
        '『 鸟儿美在羽毛，人们美在勤劳。』',
        '『 培养意志是我们生存的目标。』— 爱献生',
        '『 侮辱那些无法要你道歉的人，本身就是怯懦的表现。』— 米克沙特·卡尔曼',
        '『 每一天都是做人的开始，每一个时刻都是自己的警惕。』',
        '『 意志就是力量。』— 拉丁美洲',
        '『 表现勇敢则勇气来；往后退缩则恐惧来。』— 康拉德',
        '『 恨是一支箭，最后会射向自己。』',
        '『 勇敢是与深思和决断为伍的。』— 俞吾金',
        '『 愤怒是吹熄心灵明灯的狂风。』',
        '『 小小的好事，做出来就变成大大的好处。』',
        '『 人往往不是没有力量去做事，而是不肯去做。』',
        '『 勇敢征服一切：它甚至能给血肉之躯增添力量。』— 奥维德',
        '『 没有人与你做对，只是角度不同。』',
        '『 生气往往会蒙蔽我们的判断力。』',
        '『 聪明人的嘴藏在心里，愚蠢人的心摆在嘴里。』',
        '『 艰苦能磨练人的意志。』— 托·布朗',
        '『 没有力量的意志就如同假装士兵的孩子。』— 坎宁',
        '『 生活中有两个悲剧，一个是你的欲望得不到满足，另一个是你的欲望得到了满足。』',
        '『 有了坚定的意志，就等于给双脚添了一双翅膀。』— 乔·贝利',
        '『 我总在抱怨自己没鞋子穿，直到有一天，我遇到了一个没有脚的人。』',
        '『 天下绝无不热烈勇敢地追求成功，而能取得成功的人。』— 拿破仑',
        '『 “路”必须去走方能到达，“事”必须去做才能完成，而“苦”则必须去受才可消除。』',
        '『 不要觉得自己很不幸，世界上比我们更苦的人还很多。』',
        '『 怯懦是你最大的敌人，勇敢则是你最好的朋友。』— 莱昂纳德·弗兰克转',
        '『 意志的力量大于手的力量。』— 索福克勒斯',
        '『 先相信你自己，然后别人才会相信你。』',
        '『 人不论做错几次，只要不失再来一次的勇气，必然大有可为。』',
        '『 最高贵的复仇是宽恕对方。』',
        '『 勇猛，大胆和坚定的决心能够抵得上武器的精良。』— 达·芬奇',
        '『 有多少力量，就做多少事；切莫等待，等待常会落空。』',
        '『 谁恐惧，谁就要受折磨，并且已经受着他的恐惧的折磨。』— 蒙田',
        '『 我这个人走得很慢，但是我从不后退。』— 亚伯拉罕·林肯',
        '『 使意志获得自由的唯一途径，就是让意志摆脱任性。』— 朱·查·黑尔',
        '『 生气的时候，开口前先数到十，如果非常愤怒，先数到一百。』',
        '『 幸运所需要的美德是节制，而逆境所需要的美德是坚忍。』— 费·培根',
        '『 勇敢是一种基于自尊的意识而发展成的能力。』- 拿破仑',
        '『 获得朋友的唯一之道，是自己主动去做别人的朋友。』',
        '『 如果他是一棵软弱的芦草，就让他枯萎吧；如果他是一个勇敢的人，就让他自己打出一条路出来吧。』— 司汤达',
        '『 意志是每一个人的精神力量，是要创造或是破坏某种东西的自由的憧憬，是能从无中创造奇迹的创造力。』— 莱蒙托夫',
        '『 成功的第一个条件就是要有决心；而决心要不得迅速，干脆，果断，又必须具有成功的信心。』— 大仲马',
        '『 人生不可以有后悔，只可以有遗憾，遗憾是感叹错过，后悔是否定自己曾经做的选择』 — 《一切都是最好的安排》 ',
        '『 “太阳快落下去了，你们的孩子居然不害怕？”“当然不害怕，她知道明天太阳还会升起来的。”』 — 《三体II》 ',
        '『 命运如同一团乱麻，我们抽丝剥茧百般追寻，最终终于解开了这个线团，却发现所有人手里都拿错了线头…』 — 《希灵帝国》 ',
        '『 他并不是有多寂寞，有多孤单，需要在这里随便找个什么人开始一段感情，只是因为对方是顾飞。』 — 《撒野》 ',
        '『 自己觉得不好的事情，就干脆不要有第一次，一次也不要做，一小步也不能走出去，要不然回头来看，吃亏吃苦的还是自己。』 — 《剑来》',
        '『 真正的强者不在于什么无敌，而在于活着，输得再惨都别死了，而是每次都能够站起来，再次愤然出拳出剑！』—《剑来》 ',
        '『 没有谁的生活会一直完美，但无论什么时候，都要看着前方，满怀希望就会所向披靡。』—《撒野》 ',
        '『 为你的生命找到一个长期的、深层的、不能被满足的乐趣，让这个永恒乐趣带领你穿透生命的无常。』 — 《拆掉思维里的墙》 ',
        '『 仿佛这一瞬间，火光也照亮了他同驹子共同度过的岁月。这当中也充满一种说不出的苦痛和悲哀。 』 — 《雪国》 ',
        '『 人都会长大的，长大了之后，就会捡起一些新东西，丢掉一些旧东西，就这么丢丢捡捡，哗啦一下子，就老喽。』 — 《剑来》 ',
        '『 到了热血沸腾，理智允许的时候还不敢挺身向前的人，就是懦夫；达到了预想的目的后还在冒进的人，就是小人。』— 海涅',
        '『 庸庸碌碌，心安理得地过下去是不道德的。而自动从战斗中退缩的人则是一个懦夫。』— 罗曼·罗兰',
        '『 奋斗只是一种行动的昭示，而实际的行动却应该有详细的计划，清楚的段落，坚定的意志和力量。』— 戴尔·卡耐基',
        '『 我认为克服恐惧最好的办法理应是：面对内心所恐惧的事情，勇往直前地去做，直到成功为止。』— 罗斯福',
        '『 要记住！情况越严重，越困难，就越需要坚定，积极，果敢，而消极无为就越有害。』— 列夫·托尔斯泰',
        '『 既然他有勇气去死，他应该有力量去干斗争。拒不接受苦难不是力量的表现，而是懦弱的表现。』— 巴尔扎克',
        '『 当别人有生气的情绪时，我们不妨把它当成是一种求救的讯息— 其实他们内心欠缺的是更多自尊及肯定。』',
        '『 勇气是人类最重要的一种特质，倘若有了勇气，人类其他的特质自然也就具备了。』— 丘吉尔',
        '『 畏惧敌人徒然沮丧了自己的勇气，也就是削弱自己的力量，增加敌人的声势，等于让自己的愚蠢攻击自己。畏惧并不能免于一死，战争的结果大不了也不过一死。奋战而死，是以死亡摧毁死亡，畏怯而死，却做了死亡的奴隶。』— 莎士比亚',
        '『 人与人之间情断义绝，并不需要什么具体理由，就算表面上有，也很可能只是心已经离开的结果，事后才编造出的借口而已。』 — 《解忧杂货铺》 ',
        '『 勇气就是一种坚韧；正因为它是一种坚韧，才使我们具有任何形式的自我否定和自我战胜的能力。因而，正是借助于这上点，勇气也多少与德行发生了关系。』— 叔本华',
        '『 我不敢告诉你我是谁，因为假如我告诉你，你可能会不喜欢我，而那却是我全部所有』 — 《为什么我不敢告诉你我是谁？》 ',
        '『 日子过的象流水一般。它静静的从我们身边缓缓流过，不带半分声响。那些我们当年执着的人，执着的事，执着之后，却变成一种负担。』 — 《凑合活着》 ',
        '『 唯一不可阻挡的是时间，它像一把利刃，无声地切开了坚硬和柔软的一切，恒定地向前推进着，没有任何东西能够使它的行进产生丝毫颠簸，它却改变着一切。』 — 《三体》 ',
        '『 阳光依然干净，星河依然灿烂。世界也依然在长久深情中缓缓地朝前走。于是时间奔流，得以见证人间在漫长岁月里，所有的永恒和不朽。』 — 《黑天》 ',
        '『 晚年惟好静，万事不关心。 自顾无长策，空知返旧林。 松风吹解带，山月照弹琴。 君问穷通理，渔歌入浦深。 』- 王维《酬张少府》 ',
        '『 一为迁客去长沙，西望长安不见家。 黄鹤楼中吹玉笛，江城五月落梅花。 』- 李白《与史郎中钦听黄鹤楼上吹笛》 ',
        '『 边草，边草，边草尽来兵老。山南山北雪晴。千里万里月明。明月，明月，胡笳一声愁绝。 』- 戴叔伦《调笑令·边草》 ',
        '『 杨花落尽子规啼，闻道龙标过五溪。 我寄愁心与明月，随风直到夜郎西。 』- 李白《闻王昌龄左迁龙标遥有此寄》 ',
        '『 国破山河在，城春草木深。 感时花溅泪，恨别鸟惊心。 烽火连三月，家书抵万金。 白头搔更短，浑欲不胜簪。 』- 杜甫《春望》 ',
        '『 故人西辞黄鹤楼，烟花三月下扬州。 孤帆远影碧空尽，唯见长江天际流。 』- 李白《黄鹤楼送孟浩然之广陵》',
        '『 毕竟西湖六月中，风光不与四时同。 接天莲叶无穷碧，映日荷花别样红。 』- 杨万里 《晓出净慈寺送林子方》 ',
        '『 无言独上西楼，月如钩。寂寞梧桐深院锁清秋。 剪不断，理还乱，是离愁。别是一般滋味在心头。 』- 李煜《相见欢》 ',
        '『 细草微风岸，危樯独夜舟。 星垂平野阔，月涌大江流。 名岂文章著，官应老病休。 飘飘何所似？天地一沙鸥。 』- 杜甫《旅夜书怀》 ',
        '『 灞原风雨定，晚见雁行频。 落叶他乡树，寒灯独夜人。 空园白露滴，孤壁野僧邻。 寄卧郊扉久，何年致此身。 』- 马戴《灞上秋居》 ',
        '『 僵卧孤村不自哀，尚思为国戍轮台。 夜阑卧听风吹雨，铁马冰河入梦来。 』 - 陆游 《十一月四日风雨大作》 ',
        '『 单车欲问边，属国过居延。 征蓬出汉塞，归雁入胡天。 大漠孤烟直，长河落日圆。 萧关逢候骑，都护在燕然。 』- 王维《使至塞上》 ',
        '『 枯藤老树昏鸦，小桥流水人家，古道西风瘦马。夕阳西下，断肠人在天涯。 』- 马致远《越调·天净沙·秋思》 ',
        '『 旅馆无良伴，凝情自悄然。 寒灯思旧事，断雁警愁眠。 远梦归侵晓，家书到隔年。 沧江好烟月，门系钓鱼船。 』- 杜牧 《旅宿》 ',
        '『 疲马卧长坂，夕阳下通津。山风吹空林，飒飒如有人。苍旻霁凉雨，石路无飞尘。千念集暮节，万籁悲萧辰。鶗鴂昨夜鸣，蕙草色已陈。况在远行客，自然多苦辛。』 - 唐·岑参《暮秋山行》',
        '『 吏舍局终年，出郊旷清曙。杨柳散和风，青山澹吾虑。依丛适自憩，缘涧还复去。微雨霭芳原，春鸠鸣何处。乐幽心屡止，遵事迹犹遽。终罢斯结庐，慕陶真可庶。』- 韦应物 《东郊》',
        '『 永日方戚戚，出行复悠悠。女子今有行，大江溯轻舟。尔辈苦无恃，抚念益慈柔。幼为长所育，两别泣不休。对此结中肠，义往难复留。自小阙内训，事姑贻我忧。赖兹托令门，任恤庶无尤。贫俭诚所尚，资从岂待周。孝恭遵妇道，容止顺其猷。别离在今晨，见尔当何秋。居闲始自遣，临感忽难收。归来视幼女，零泪缘缨流。』- 韦应物 《送杨氏女》',
        '『 汲井漱寒齿，清心拂尘服。闲持贝叶书，步出东斋读。真源了无取，妄迹世所逐。遗言冀可冥，缮性何由熟。道人庭宇静，苔色连深竹。日出雾露余，青松如膏沐。澹然离言说，悟悦心自足。』- 柳宗元《晨诣超师院读禅经》',
        '『 明月出天山，苍茫云海间。长风几万里，吹度玉门关。汉下白登道，胡窥青海湾。由来征战地，不见有人还。戍客望边色，思归多苦颜。高楼当此夜，叹息未应闲。』- 李白《关山月》',
        '『 妾发初覆额，折花门前剧。郎骑竹马来，绕床弄青梅。同居长干里，两小无嫌猜。十四为君妇，羞颜未尝开。低头向暗壁，千唤不一回。十五始展眉，愿同尘与灰。常存抱柱信，岂上望夫台。十六君远行，瞿塘滟滪堆。五月不可触，猿鸣天上哀。门前迟行迹，一一生绿苔。苔深不能扫，落叶秋风早。八月蝴蝶黄，双飞西园草。感此伤妾心，坐愁红颜老。早晚下三巴，预将书报家。相迎不道远，直至长风沙。』- 李白 《长干行》',
        '『 莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。 料峭春风吹酒醒，微冷，山头斜照却相迎。回首向来萧瑟处，归去，也无风雨也无晴。』- 苏轼 《定风波》  ',
        '『 人生到处知何似，应似飞鸿踏雪泥。 泥上偶然留指爪，鸿飞那复计东西。 老僧已死成新塔，坏壁无由见旧题。 往日崎岖还记否，路长人困蹇驴嘶。』- 苏轼《和子由渑池怀旧》  ',
        '『 汲井漱寒齿，清心拂尘服。 闲持贝叶书，步出东斋读。 真源了无取，妄迹世所逐。 遗言冀可冥，缮性何由熟。 道人庭宇静，苔色连深竹。 日出雾露余，青松如膏沐。 澹然离言说，悟悦心自足。』- 柳宗元 《晨诣超师院读禅经》 ',
        '『 云销雨霁，彩彻区明。落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨；雁阵惊寒，声断衡阳之浦。 』 - 王勃 《滕王阁序》',
        '『 何处望神州？满眼风光北固楼。千古兴亡多少事？悠悠，不尽长江滚滚流！ 年少万兜鍪，坐断东南战未休。天下英雄谁敌手？曹刘。生子当如孙仲谋！ 』- 辛弃疾 《南乡子》 ',
        '『 凤凰台上凤凰游，凤去台空江自流。 吴宫花草埋幽径，晋代衣冠成古丘。 三山半落青天外，二水中分白鹭洲。 总为浮云能蔽日，长安不见使人愁。 』- 李白 《登金陵凤凰台》 ',
        '『 丞相祠堂何处寻，锦官城外柏森森。 映阶碧草自春色，隔叶黄鹂空好音。 三顾频烦天下计，两朝开济老臣心。 出师未捷身先死，长使英雄泪满襟。 』- 杜甫 《蜀相》 ',
        '『 天地有正气，杂然赋流形。 下则为河岳，上则为日星。 于人曰浩然，沛乎塞苍冥。 皇路当清夷，含和吐明庭。 时穷节乃见，一一垂丹青。 』- 文天祥 《正气歌》 ',
        '『 王濬楼船下益州，金陵王气黯然收。 千寻铁锁沉江底，一片降幡出石头。 人世几回伤往事，山形依旧枕寒流。 今逢四海为家日，故垒萧萧芦荻秋。 』- 刘禹锡《西塞山怀古》 ',
        '『 登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇。征帆去棹残阳里，背西风，酒旗斜矗。彩舟云淡，星河鹭起，画图难足。 念往昔，繁华竞逐。叹门外楼头，悲恨相续。千古凭高，对此漫嗟荣辱。六朝旧事随流水，但寒烟衰草凝绿。至今商女，时时犹唱，后庭遗曲。 』 - 王安石 《桂枝香·金陵怀古》 ',
        '『 江城如画里，山晚望晴空。 两水夹明镜，双桥落彩虹。 人烟寒橘柚，秋色老梧桐。 谁念北楼上，临风怀谢公。 』- 李白《秋登宣城谢脁北楼》 ',
        '『 海外徒闻更九州，他生未卜此生休。 空闻虎旅传宵柝，无复鸡人报晓筹。 此日六军同驻马，当时七夕笑牵牛。 如何四纪为天子，不及卢家有莫愁。 』- 李商隐《马嵬》 ',
        '『 天地英雄气，千秋尚凛然。 势分三足鼎，业复五铢钱。 得相能开国，生儿不象贤。 凄凉蜀故妓，来舞魏宫前。 』- 刘禹锡《蜀先主庙》 ',
        '『 大雨落幽燕，白浪滔天，秦皇岛外打鱼船。一片汪洋都不见，知向谁边？ 往事越千年，魏武挥鞭，东临碣石有遗篇。萧瑟秋风今又是，换了人间。 』- 毛泽东《浪淘沙令·北戴河》 ',
        '『 故将军饮罢夜归来，长亭解雕鞍。恨灞陵醉尉，匆匆未识，桃李无言。射虎山横一骑，裂石响惊弦。落魄封侯事，岁晚田园。 谁向桑麻杜曲，要短衣匹马，移住南山？看风流慷慨，谈笑过残年。汉开边、功名万里，甚当时健者也曾闲？纱窗外、斜风细雨，一阵轻寒。 』- 辛弃疾《八声甘州》 ',
        '『 箫声咽，秦娥梦断秦楼月。秦楼月，年年柳色，灞陵伤别。 乐游原上清秋节，咸阳古道音尘绝。音尘绝，西风残照，汉家陵阙。 』- 李白 《忆秦娥》 ',
        '『 人初生，日初出。上山迟，下山疾。百年三万六千朝，夜里分将彊半日。 有歌有舞间早为，昨日健于今日时。人家见生男女好，不知男女催人老。 短歌行，无乐声。 』- 王建《相和歌辞·短歌行》 ',
        '『 母别子，子别母，白日无光哭声苦。 关西骠骑大将军，去年破虏新策勋。 敕赐金钱二百万，洛阳迎得如花人。 新人迎来旧人弃，掌上莲花眼中刺。 迎新弃旧未足悲，悲在君家留两儿。 一始扶行一初坐，坐啼行哭牵人衣。 以汝夫妇新燕婉，使我母子生别离。 不如林中乌与鹊，母不失雏雄伴雌。 应似园中桃李树，花落随风子在枝。 新人新人听我语，洛阳无限红楼女。 但愿将军重立功，更有新人胜于汝。 』 -  白居易《新乐府·母别子》 ',
        '『 灿灿萱草花，罗生北堂下。 南风吹其心，摇摇为谁吐？ 慈母倚门情，游子行路苦。 甘旨日以疏，音问日以阻。 举头望云林，愧听慧鸟语。 』- 王冕《墨萱图》 ',
        '『 凯风自南，吹彼棘心。棘心夭夭，母氏劬劳。 凯风自南，吹彼棘薪。母氏圣善，我无令人。 爰有寒泉？在浚之下。有子七人，母氏劳苦。 睍睆黄鸟，载好其音。有子七人，莫慰母心。 』- 《国风·邶风·凯风》 ',
        '『 慈乌失其母，哑哑吐哀音。 昼夜不飞去，经年守故林。 夜夜夜半啼，闻者为沾襟。 声中如告诉，未尽反哺心。 百鸟岂无母，尔独哀怨深。 应是母慈重，使尔悲不任。 昔有吴起者，母殁丧不临。 嗟哉斯徒辈，其心不如禽。 慈乌复慈乌，鸟中之曾参。 』- 白居易《慈乌夜啼》 ',
        '『 妾身兮不令，婴疾兮来归。 沉滞兮家门，历时兮不差。 旷废兮侍觐，情敬兮有违。 君今兮奉命，远适兮京师。 悠悠兮离别，无因兮叙怀。 瞻望兮踊跃，伫立兮徘徊。 思君兮感结，梦想兮容辉。 君发兮引迈，去我兮日乖。 恨无兮羽翼，高飞兮相追。 长吟兮永叹，泪下兮沾衣。 』- 徐淑《答秦嘉诗》 ',
        '『 梁上有双燕，翩翩雄与雌。 衔泥两椽间，一巢生四儿。 四儿日夜长，索食声孜孜。 青虫不易捕，黄口无饱期。 觜爪虽欲敝，心力不知疲。 须臾十来往，犹恐巢中饥。 辛勤三十日，母瘦雏渐肥。 喃喃教言语，一一刷毛衣。 一旦羽翼成，引上庭树枝。 举翅不回顾，随风四散飞。 雌雄空中鸣，声尽呼不归。 却入空巢里，啁啾终夜悲。 燕燕尔勿悲，尔当返自思。 思尔为雏日，高飞背母时。 当时父母念，今日尔应知。 』- 白居易《燕诗》 ',
        '『 黄金错刀白玉装，夜穿窗扉出光芒。 丈夫五十功未立，提刀独立顾八荒。 京华结交尽奇士，意气相期共生死。 千年史策耻无名，一片丹心报天子。 尔来从军天汉滨，南山晓雪玉嶙峋。 呜呼！楚虽三户能亡秦，岂有堂堂中国空无人？ 』- 陆游《金错刀行》 ',
        '『 当年万里觅封侯，匹马戍梁州。关河梦断何处，尘暗旧貂裘。 胡未灭，鬓先秋，泪空流。此生谁料，心在天山，身老沧洲。 』- 陆游《诉衷情令》 ',
        '『 春未老，风细柳斜斜。试上超然台上望，半壕春水一城花。烟雨暗千家。 寒食后，酒醒却咨嗟。休对故人思故国，且将新火试新茶，诗酒趁年华。』- 苏轼《望江南·超然台作》 ',
        '『 世味年来薄似纱，谁令骑马客京华。 小楼一夜听春雨，深巷明朝卖杏花。 矮纸斜行闲作草，晴窗细乳戏分茶。 素衣莫起风尘叹，犹及清明可到家。』- 陆游 《临安春雨初霁》 ',
        '『 寒日萧萧上锁窗，梧桐应恨夜来霜。酒阑更喜团茶苦，梦断偏宜瑞脑香。 秋已尽，日犹长。仲宣怀远更凄凉。不如随分尊前醉，莫负东篱菊蕊黄。』- 李清照 《鹧鸪天》',
        '『 结庐在人境，而无车马喧。 问君何能尔？心远地自偏。 采菊东篱下，悠然见南山。 山气日夕佳，飞鸟相与还。 此中有真意，欲辨已忘言。』- 陶潜 《饮酒》',
        '『 中岁颇好道，晚家南山陲。 兴来每独往，胜事空自知。 行到水穷处，坐看云起时。 偶然值林叟，谈笑无还期。』-王维 《终南别业》',
        '『 清晨入古寺，初日照高林。 曲径通幽处，禅房花木深。 山光悦鸟性，潭影空人心。 万籁此俱寂，但馀钟磬音。』-常建 《题破山寺后禅院》  ',
        '『 少日春怀似酒浓，插花走马醉千钟。老去逢春如病酒，唯有，茶瓯香篆小帘栊。卷尽残花风未定，休恨，花开元自要春风。试问春归谁得见？飞燕，来时相遇夕阳中。』- 辛弃疾 《定风波》',
        '『 湖山胜处放翁家，槐柳阴中野径斜。 水满有时观下鹭，草深无处不鸣蛙。 箨龙已过头番笋，木笔犹开第一花。 叹息老来交旧尽，睡来谁共午瓯茶。』- 陆游《幽居初夏》 ',
        '『 一碗喉吻润，两碗破孤闷。三碗搜枯肠，唯有文字五千卷。四碗发轻汗，平生不平事，尽向毛孔散。五碗肌骨清，六碗通仙灵。七碗吃不得也，唯觉两腋习习清风生。蓬莱山，在何处？玉川子，乘此清风欲归去。山上群仙司下土，地位清高隔风雨。安得知百万亿苍生命，堕在巅崖受辛苦！便为谏议问苍生，到头还得苏息否。』- 卢仝',
        '『 茶，香叶，嫩芽。慕诗客，爱僧家。碾雕白玉，罗织红纱。铫煎黄蕊色，椀转曲尘花。夜后邀陪明月，晨前命对朝霞。洗尽古今人不倦，将知醉后岂堪夸。』- 元稹 《一七字茶诗》',
        '『 茶瓯。醒困堪求。粗饱饭安居可以休。算悠闲静胜，吾能自乐，荣华纷扰，人谩多愁。习懒非痴，觉迷是病，一力那能胜九牛。俱休问，且追寻觞咏，知友从游。』- 赵师侠 《沁园春》',
        '『 香冷金猊，被翻红浪，起来慵自梳头。任宝奁尘满，日上帘钩。生怕离怀别苦，多少事、欲说还休。新来瘦，非干病酒，不是悲秋。 休休，这回去也，千万遍《阳关》，也则难留。念武陵人远，烟锁秦楼。惟有楼前流水，应念我、终日凝眸。凝眸处，从今又添，一段新愁。 』- 李清照《凤凰台上忆吹箫》 ',
        '『 行行重行行，与君生别离。 相去万馀里，各在天一涯； 道路阻且长，会面安可知？ 胡马依北风，越鸟巢南枝。 相去日已远，衣带日已缓； 浮云蔽白日，游子不顾反。 思君令人老，岁月忽已晚。 弃捐勿复道，努力加餐饭。 』- 《古诗十九首·行行重行行》',
        '『 候馆梅残，溪桥柳细，草薰风暖摇征辔。离愁渐远渐无穷，迢迢不断如春水。 寸寸柔肠，盈盈粉泪，楼高莫近危阑倚。平芜尽处是春山，行人更在春山外。 』- 欧阳修《踏莎行》 ',
        '『 凤凰山下雨初晴，水风清，晚霞明。一朵芙蕖，开过尚盈盈。何处飞来双白鹭，如有意，慕娉婷。 忽闻江上弄哀筝，苦含情，遣谁听？烟敛云收，依约是湘灵。欲待曲终寻问取，人不见，数峰青。 』- 苏轼《江神子·湖上与张先同赋时闻弹筝》 ',
        '『 倚危亭、恨如芳草，萋萋刬尽还生。念柳外青骢别后，水边红袂分时，怆然暗惊。 无端天与娉婷，夜月一帘幽梦，春风十里柔情。怎奈向、欢娱渐随流水，素弦声断，翠绡香减，那堪片片飞花弄晚，蒙蒙残雨笼晴。正销凝，黄鹂又啼数声。 』- 秦观 《八六子》 ',
        '『 言入黄花川，每逐青溪水。随山将万转，趣途无百里。声喧乱石中，色静深松里。漾漾泛菱荇，澄澄映葭苇。我心素已闲，清川澹如此。请留盘石上，垂钓将已矣。』 - 王维 《青溪》',
        '『 斜光照墟落，穷巷牛羊归。野老念牧童，倚杖候荆扉。雉雊麦苗秀，蚕眠桑叶稀。田夫荷锄至，相见语依依。即此羡闲逸，怅然吟式微。』- 王维 《渭川田家》',
        '『 艳色天下重，西施宁久微。朝为越溪女，暮作吴宫妃。贱日岂殊众，贵来方悟稀。邀人傅粉粉，不自着罗衣。君宠益娇态，君怜无是非。当时浣纱伴，莫得同车归。持谢邻家子，效颦安可希。』- 王维 《西施咏》',
        '『 北山白云里，隐者自怡悦。相望始登高，心随雁飞灭。愁因薄暮起，兴是清秋发。时见归村人，沙行渡头歇。天边树若荠，江畔洲如月。何当载酒来，共醉重阳节。』- 孟浩然 《秋登兰山寄张五》',
        '『 山光忽西落，池月渐东上。散发乘夕凉，开轩卧闲敞。荷风送香气，竹露滴清响。欲取鸣琴弹，恨无知音赏。感此怀故人，中宵劳梦想。』- 孟浩然 《夏日南亭怀辛大》',
        '『 夕阳度西岭，群壑倏已暝。松月生夜凉，风泉满清听。樵人归尽欲，烟鸟栖初定。之子期宿来，孤琴候萝径。』- 孟浩然 《宿业师山房待丁大不至》',
        '『 高卧南斋时，开帷月初吐。清辉淡水木，演漾在窗户。苒苒几盈虚，澄澄变今古。美人清江畔，是夜越吟苦。千里其如何，微风吹兰杜。』- 王昌龄',
        '『 东望山阴何处是。往来一万三千里。写得家书空满纸。流清泪。书回已是明年事。 寄语红桥桥下水。扁舟何日寻兄弟。行遍天涯真老矣。愁无寐。鬓丝几缕茶烟里。』- 陆游 《渔家傲·寄仲高》 ',
        '『 知章骑马似乘船，眼花落井水底眠。汝阳三斗始朝天，道逢曲车口流涎，恨不移封向酒泉。左相日兴费万钱，饮如长鲸吸百川，衔杯乐圣称避贤。宗之潇洒美少年，举觞白眼望青天，皎如玉树临风前。苏晋长斋绣佛前，醉中往往爱逃禅。李白斗酒诗百篇，长安市上酒家眠，天子呼来不上船，自称臣是酒中仙。张旭三杯草圣传，脱帽露顶王公前，挥毫落纸如云烟。焦遂五斗方卓然，高谈雄辩惊四筵。』 - 杜甫 《饮中八仙歌》',
        '『 明月几时有，把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，惟恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间！ 转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。 』 - 苏轼 《水调歌头》',
        '『 昨夜雨疏风骤，浓睡不消残酒。试问卷帘人，却道海棠依旧。知否？知否？应是绿肥红瘦。 』 - 李清照 《如梦令·昨夜雨疏风骤》',
        '『 暮从碧山下，山月随人归。 却顾所来径，苍苍横翠微。 相携及田家，童稚开荆扉。 绿竹入幽径，青萝拂行衣。 欢言得所憩，美酒聊共挥。 长歌吟松风，曲尽河星稀。 我醉君复乐，陶然共忘机。 』 - 李白《下终南山过斛斯山人宿置酒》 ',
        '『 一曲新词酒一杯，去年天气旧亭台。夕阳西下几时回？ 无可奈何花落去，似曾相识燕归来，小园香径独徘徊。』 - 晏殊《浣溪沙·一曲新词酒一杯》 ',
        '『 清夜无尘，月色如银。酒斟时、须满十分。浮名浮利，虚苦劳神。叹隙中驹，石中火，梦中身。 虽抱文章，开口谁亲。且陶陶、乐尽天真。几时归去，作个闲人。对一张琴，一壶酒，一溪云。 』 - 苏轼《行香子·述怀》 ',
        '『 劝君今夜须沈醉，尊前莫话明朝事。珍重主人心，酒深情亦深。 须愁春漏短，莫诉金杯满。遇酒且呵呵，人生能几何。 』 - 韦庄 《菩萨蛮》',
        '『 故人具鸡黍，邀我至田家。 绿树村边合，青山郭外斜。 开轩面场圃，把酒话桑麻。 待到重阳日，还来就菊花。 』 - 孟浩然《过故人庄》 ',
        '『 剑外忽传收蓟北，初闻涕泪满衣裳。 却看妻子愁何在，漫卷诗书喜欲狂。 白日放歌须纵酒，青春作伴好还乡。 即从巴峡穿巫峡，便下襄阳向洛阳。​ 』 - 杜甫《闻官军收河南河北》',
        '『 君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。烹羊宰牛且为乐，会须一饮三百杯。岑夫子，丹丘生，将进酒，杯莫停。与君歌一曲，请君为我倾耳听。钟鼓馔玉不足贵，但愿长醉不复醒。古来圣贤皆寂寞，惟有饮者留其名。陈王昔时宴平乐，斗酒十千恣欢谑。主人何为言少钱，径须沽取对君酌。五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。 』 - 李白',
        '『 我居北海君南海，寄雁传书谢不能。 桃李春风一杯酒，江湖夜雨十年灯。 持家但有四立壁，治病不蕲三折肱。 想得读书头已白，隔溪猿哭瘴溪藤。 』 - 黄庭坚《寄黄几复》 ',
        '『 暮投石壕村，有吏夜捉人。 老翁逾墙走，老妇出门看。 吏呼一何怒！妇啼一何苦。 听妇前致词，三男邺城戍。 一男附书至，二男新战死。 存者且偷生，死者长已矣！ 室中更无人，惟有乳下孙。 有孙母未去，出入无完裙。 老妪力虽衰，请从吏夜归。 急应河阳役，犹得备晨炊。 夜久语声绝，如闻泣幽咽。 天明登前途，独与老翁别。 』- 杜甫《石壕吏》 ',
        '『 醉里挑灯看剑，梦回吹角连营。八百里分麾下炙，五十弦翻塞外声。沙场秋点兵。 马作的卢飞快，弓如霹雳弦惊。了却君王天下事，赢得生前身后名。可怜白发生！ 』 - 辛弃疾《破阵子·为陈同甫赋壮词以寄之》 ',
        '『 黑云压城城欲摧，甲光向日金鳞开。 角声满天秋色里，塞上燕脂凝夜紫。 半卷红旗临易水，霜重鼓寒声不起。 报君黄金台上意，提携玉龙为君死。』- 李贺《雁门太守行》 ',
        '『 烽火照西京，心中自不平。 牙璋辞凤阙，铁骑绕龙城。 雪暗凋旗画，风多杂鼓声。 宁为百夫长，胜作一书生。 』 - 杨炯《从军行》 ',
        '『 岁暮阴阳催短景，天涯霜雪霁寒宵。 五更鼓角声悲壮，三峡星河影动摇。 野哭千家闻战伐，夷歌数处起渔樵。 卧龙跃马终黄土，人事音书漫寂寥。 』- 杜甫 《阁夜》',
        '『 挽弓当挽强，用箭当用长。 射人先射马，擒贼先擒王。 杀人亦有限，列国自有疆。 苟能制侵陵，岂在多杀伤！ 』 - 杜甫 《前出塞》',
        '『 士卒何草草，筑城潼关道。 大城铁不如，小城万丈馀。 借问潼关吏，修关还备胡。 要我下马行，为我指山隅。 连云列战格，飞鸟不能逾。 胡来但自守，岂复忧西都。 丈人视要处，窄狭容单车。 艰难奋长戟，万古用一夫。 哀哉桃林战，百万化为鱼。 请嘱防关将，慎勿学哥舒。 』 - 杜甫《潼关吏》',
        '『 十里一走马，五里一扬鞭。 都护军书至，匈奴围酒泉。 关山正飞雪，烽戍断无烟。 』- 王维《陇西行》',
        '『 客行新安道，喧呼闻点兵。 借问新安吏，县小更无丁。 府帖昨夜下，次选中男行。 中男绝短小，何以守王城。 肥男有母送，瘦男独伶俜。 白水暮东流，青山犹哭声。 莫自使眼枯，收汝泪纵横。 眼枯即见骨，天地终无情。 我军取相州，日夕望其平。 岂意贼难料，归军星散营。 就粮近故垒，练卒依旧京。 掘壕不到水，牧马役亦轻。 况乃王师顺，抚养甚分明。 送行勿泣血，仆射如父兄。 』- 杜甫《新安吏》 ',
        '『 寂寞天宝后，园庐但蒿藜。 我里百馀家，世乱各东西。 存者无消息，死者为尘泥。 贱子因阵败，归来寻旧蹊。 人行见空巷，日瘦气惨凄。 但对狐与狸，竖毛怒我啼。 四邻何所有，一二老寡妻。 宿鸟恋本枝，安辞且穷栖。 方春独荷锄，日暮还灌畦。 县吏知我至，召令习鼓鞞。 虽从本州役，内顾无所携。 近行止一身，远去终转迷。 家乡既荡尽，远近理亦齐。 永痛长病母，五年委沟谿。 生我不得力，终身两酸嘶。 人生无家别，何以为烝黎。』- 杜甫 《无家别》',
        '『 四郊未宁静，垂老不得安。 子孙阵亡尽，焉用身独完。 投杖出门去，同行为辛酸。 幸有牙齿存，所悲骨髓干。 男儿既介胄，长揖别上官。 老妻卧路啼，岁暮衣裳单。 孰知是死别，且复伤其寒。 此去必不归，还闻劝加餐。 土门壁甚坚，杏园度亦难。 势异邺城下，纵死时犹宽。 人生有离合，岂择衰老端。 忆昔少壮日，迟回竟长叹。 万国尽征戍，烽火被冈峦。 积尸草木腥，流血川原丹。 何乡为乐土，安敢尚盘桓。 弃绝蓬室居，塌然摧肺肝。』- 杜甫 《垂老别》',
        '『 闻道黄龙戍，频年不解兵。 可怜闺里月，长在汉家营。 少妇今春意，良人昨夜情。 谁能将旗鼓，一为取龙城。 』- 沈佺期《杂诗》 ',
        '『 君不见走马川行雪海边，平沙莽莽黄入天。 轮台九月风夜吼，一川碎石大如斗，随风满地石乱走。 匈奴草黄马正肥，金山西见烟尘飞，汉家大将西出师。 将军金甲夜不脱，半夜军行戈相拨，风头如刀面如割。 马毛带雪汗气蒸，五花连钱旋作冰，幕中草檄砚水凝。 虏骑闻之应胆慑，料知短兵不敢接，车师西门伫献捷。 』- 岑参《走马川行奉送封大夫出师西征》 ',
        '『 轮台城头夜吹角，轮台城北旄头落。 羽书昨夜过渠黎，单于已在金山西。 戍楼西望烟尘黑，汉兵屯在轮台北。 上将拥旄西出征，平明吹笛大军行。 四边伐鼓雪海涌，三军大呼阴山动。 虏塞兵气连云屯，战场白骨缠草根。 剑河风急雪片阔，沙口石冻马蹄脱。 亚相勤王甘苦辛，誓将报主静边尘。 古来青史谁不见，今见功名胜古人。 』- 岑参《轮台歌奉送封大夫出师西征》 ',
        '『 云开远见汉阳城，犹是孤帆一日程。 估客昼眠知浪静，舟人夜语觉潮生。 三湘愁鬓逢秋色，万里归心对月明。 旧业已随征战尽，更堪江上鼓鼙声。 』- 卢纶《晚次鄂州》 ',
        '『 男儿事长征，少小幽燕客。 赌胜马蹄下，由来轻七尺。 杀人莫敢前，须如猬毛磔。 黄云陇底白雪飞，未得报恩不能归。 辽东小妇年十五，惯弹琵琶解歌舞。 今为羌笛出塞声，使我三军泪如雨。 』- 李颀《古意》 ',
        '『 怒发冲冠，凭栏处、潇潇雨歇。抬望眼，仰天长啸，壮怀激烈。三十功名尘与土，八千里路云和月。莫等闲，白了少年头，空悲切！ 靖康耻，犹未雪。臣子恨，何时灭？驾长车、踏破贺兰山缺！壮志饥餐胡虏肉，笑谈渴饮匈奴血。待从头、收拾旧山河，朝天阙！ 』- 岳飞《满江红》 ',
        '『 寒蝉凄切，对长亭晚，骤雨初歇。都门帐饮无绪，留恋处，兰舟催发。执手相看泪眼，竟无语凝噎。念去去，千里烟波，暮霭沉沉楚天阔。 多情自古伤离别，更那堪、冷落清秋节。今宵酒醒何处？杨柳岸，晓风残月。此去经年，应是良辰好景虚设。便纵有千种风情，更与何人说？ 』- 柳永《雨霖铃·秋别》 ',
        '『 弃我去者，昨日之日不可留。 乱我心者，今日之日多烦忧。 长风万里送秋雁，对此可以酣高楼。 蓬莱文章建安骨，中间小谢又清发。 俱怀逸兴壮思飞，欲上青天览明月。 抽刀断水水更流，举杯销愁愁更愁。 人生在世不称意，明朝散发弄扁舟。 』- 李白《宣州谢朓楼饯别校书叔云》 ',
        '『 迢迢牵牛星，皎皎河汉女。 纤纤擢素手，札札弄机杼。 终日不成章，泣涕零如雨。 河汉清且浅，相去复几许。 盈盈一水间，脉脉不得语。 』- 《古诗十九首·迢迢牵牛星》',
        '『 尊前拟把归期说，欲语春容先惨咽。人生自是有情痴，此恨不关风与月。 离歌且莫翻新阕，一曲能教肠寸结。直须看尽洛城花，始共春风容易别。 』- 欧阳修《玉楼春》 ',
        '『 风吹柳花满店香，吴姬压酒唤客尝。 金陵子弟来相送，欲行不行各尽觞。 请君试问东流水，别意与之谁短长。』- 李白《金陵酒肆留别》 ',
        '『 男儿事长征，少小幽燕客。赌胜马蹄下，由来轻七尺。杀人莫敢前，须如猬毛磔。黄云陇底白云飞，未得报恩不能归。辽东小妇年十五，惯弹琵琶解歌舞。今为羌笛出塞声，使我三军泪如雨。』- 李颀 《古意》',
        '『 主人有酒欢今夕，请奏鸣琴广陵客。月照城头乌半飞，霜凄万树风入衣。铜炉华烛烛增辉，初弹渌水后楚妃。一声已动物皆静，四座无言星欲稀。清淮奉使千余里，敢告云山从此始。』- 李颀 《琴歌》',
        '『 山寺钟鸣昼已昏，渔梁渡头争渡喧。人随沙岸向江村，余亦乘舟归鹿门。鹿门月照开烟树，忽到庞公栖隐处。岩扉松径长寂寥，惟有幽人自来去。』-孟浩然 《夜归鹿门山歌》',
        '『 我本楚狂人，凤歌笑孔丘。手持绿玉杖，朝别黄鹤楼。五岳寻仙不辞远，一生好入名山游。』- 李白 《庐山谣寄卢侍御虚舟》',
        '『 海客谈瀛洲，烟涛微茫信难求。越人语天姥，云霓明灭或可睹。天姥连天向天横，势拔五岳掩赤城。天台四万八千丈，对此欲倒东南倾。我欲因之梦吴越，一夜飞度镜湖月。湖月照我影，送我至剡溪。』- 李白 《梦游天姥吟留别》',
        '『 风吹柳花满店香，吴姬压酒唤客尝。金陵子弟来相送，欲行不行各尽觞。请君试问东流水，别意与之谁短长。』- 李白 《金陵酒肆留别》',
        '『 弃我去者，昨日之日不可留；乱我心者，今日之日多烦忧。长风万里送秋雁，对此可以酣高楼。蓬莱文章建安骨，中间小谢又清发。俱怀逸兴壮思飞，欲上青天揽明月。抽刀断水水更流，举杯销愁愁更愁。人生在世不称意，明朝散发弄扁舟。』-李白',
        '『 君不见，走马川行雪海边，平沙莽莽黄入天。 轮台九月风夜吼，一川碎石大如斗，随风满地石乱走。』- 岑参 《走马川行奉送封大夫出师西征》',
        '『 北风卷地白草折，胡天八月即飞雪。忽如一夜春风来，千树万树梨花开。』- 岑参 《白雪歌送武判官归京》',
        '『 渔翁夜傍西岩宿，晓汲清湘燃楚竹。烟销日出不见人，欸乃一声山水绿。回看天际下中流，岩上无心云相逐。』-柳宗元 《渔翁》',
        '『 秋风起兮白云飞，草木黄落兮雁南归。 兰有秀兮菊有芳，怀佳人兮不能忘。 泛楼船兮济汾河，横中流兮扬素波。 箫鼓鸣兮发棹歌，欢乐极兮哀情多。 少壮几时兮奈老何！』- 刘彻 《秋风辞》 ',
        '『 对酒当歌，人生几何？譬如朝露，去日苦多。慨当以慷，忧思难忘。何以解忧？唯有杜康。青青子衿，悠悠我心。但为君故，沉吟至今。呦呦鹿鸣，食野之蘋。我有嘉宾，鼓瑟吹笙。明明如月，何时可掇？忧从中来，不可断绝。越陌度阡，枉用相存。契阔谈䜩，心念旧恩。月明星稀，乌鹊南飞。绕树三匝，何枝可依？山不厌高，海不厌深。周公吐哺，天下归心。』-曹操 《短歌行》',
        '『 皑如山上雪，皎若云间月。 闻君有两意，故来相决绝。 今日斗酒会，明旦沟水头。 躞蹀御沟上，沟水东西流。 凄凄复凄凄，嫁娶不须啼。 愿得一心人，白头不相离。 竹竿何袅袅，鱼尾何簁簁。 男儿重意气，何用钱刀为。』- 卓文君 《白头吟》',
        '『 白日登山望烽火，黄昏饮马傍交河。 行人刁斗风沙暗，公主琵琶幽怨多。 野云万里无城郭，雨雪纷纷连大漠。 胡雁哀鸣夜夜飞，胡儿眼泪双双落。 闻道玉门犹被遮，应将性命逐轻车。 年年战骨埋荒外，空见蒲桃入汉家。』-李颀 《古从军行》 ',
        '『 春江潮水连海平，海上明月共潮生。 滟滟随波千万里，何处春江无月明！ 江流宛转绕芳甸，月照花林皆似霰。 空里流霜不觉飞，汀上白沙看不见。 江天一色无纤尘，皎皎空中孤月轮。 江畔何人初见月？江月何年初照人？ 人生代代无穷已，江月年年望相似。 不知江月待何人，但见长江送流水。 白云一片去悠悠，青枫浦上不胜愁。 谁家今夜扁舟子？何处相思明月楼？ 可怜楼上月徘徊，应照离人妆镜台。 玉户帘中卷不去，捣衣砧上拂还来。 此时相望不相闻，愿逐月华流照君。 鸿雁长飞光不度，鱼龙潜跃水成文。 昨夜闲潭梦落花，可怜春半不还家。 江水流春去欲尽，江潭落月复西斜。 斜月沉沉藏海雾，碣石潇湘无限路。 不知乘月几人归，落月摇情满江树。』-《春江花月夜》',
        '『 忆梅下西洲，折梅寄江北。 单衫杏子红，双鬓鸦雏色。 西洲在何处？两桨桥头渡。 日暮伯劳飞，风吹乌臼树。』-《西洲曲》',
        '『 三月三日天气新，长安水边多丽人。 态浓意远淑且真，肌理细腻骨肉匀。 绣罗衣裳照暮春，蹙金孔雀银麒麟。 头上何所有，翠微㔩叶垂鬓唇。 背后何所见，珠压腰衱稳称身。 就中云幕椒房亲，赐名大国虢与秦。』-杜甫 《丽人行》 ',
        '『 关东有义士，兴兵讨群凶。 初期会盟津，乃心在咸阳。 军合力不齐，踌躇而雁行。 势利使人争，嗣还自相戕。 淮南弟称号，刻玺于北方。 铠甲生虮虱，万姓以死亡。 白骨露于野，千里无鸡鸣。 生民百遗一，念之断人肠。』- 曹操《蒿里行》',
        '『 渴不饮盗泉水，热不息恶木阴。 恶木岂无枝？志士多苦心。 整驾肃时命，杖策将远寻。 饥食猛虎窟，寒栖野雀林。 日归功未建，时往岁载阴。 崇云临岸骇，鸣条随风吟。 静言幽谷底，长啸高山岑。 急弦无懦响，亮节难为音。 人生诚未易，曷云开此衿？ 眷我耿介怀，俯仰愧古今。』- 陆机 《猛虎行》',
        '『 赵客缦胡缨，吴钩霜雪明。 银鞍照白马，飒沓如流星。 十步杀一人，千里不留行。 事了拂衣去，深藏身与名。 闲过信陵饮，脱剑膝前横。 将炙啖朱亥，持觞劝侯嬴。 三杯吐然诺，五岳倒为轻。 眼花耳热后，意气素霓生。 救赵挥金槌，邯郸先震惊。 千秋二壮士，烜赫大梁城。 纵死侠骨香，不惭世上英。 谁能书阁下，白首太玄经。』- 李白 《侠客行》',
        '『 松子栖金华，安期入蓬海。 此人古之仙，羽化竟何在？ 浮生速流电，倏忽变光彩。 天地无凋换，容颜有迁改。 对酒不肯饮，含情欲谁待？』- 李白 《对酒行》',
        '『 北方有佳人，绝世而独立。 一顾倾人城，再顾倾人国。 宁不知倾城与倾国，佳人难再得！』- 李延年 佳人歌',
        '『 美女妖且闲，采桑歧路间。 柔条纷冉冉，落叶何翩翩。 攘袖见素手，皓腕约金环。 头上金爵钗，腰佩翠琅玕。 明珠交玉体，珊瑚间木难。 罗衣何飘飘，轻裾随风还。 顾盼遗光彩，长啸气若兰。 行徒用息驾，休者以忘餐。 借问女安居，乃在城南端。 青楼临大路，高门结重关。 容华耀朝日，谁不希令颜？ 媒氏何所营？玉帛不时安。 佳人慕高义，求贤良独难。 众人徒嗷嗷，安知彼所观？ 盛年处房室，中夜起长叹。』- 曹植 《美女篇》',
        '『 天地并况，惟予有慕，爰熙紫坛，思求厥路。 恭承禋祀，缊豫为纷，黼绣周张，承神至尊。 千童罗舞成八溢，合好效欢虞泰一。 九歌毕奏斐然殊，鸣琴竽瑟会轩朱。 璆磬金鼓，灵其有喜，百官济济，各敬厥事。 盛牲实俎进闻膏，神奄留，临须摇。 长丽前掞光耀明，寒暑不忒况皇章。 展诗应律鋗玉鸣，函宫吐角激徵清。 发梁扬羽申以商，造兹新音永久长。 声气远条凤鸟翔，神夕奄虞盖孔享。』- 《天地》',
        '『 日出入安穷，时世不与人同。 故春非我春，夏非我夏， 秋非我秋，冬非我冬。 泊如四海之池，遍观是邪谓何？ 吾知所乐，独乐六龙。 六龙之调，使我心若。 訾，黄其何不徕下！』- 《日出入》',
        '『 唧唧复唧唧，木兰当户织。不闻机杼声，惟闻女叹息。 问女何所思，问女何所忆。女亦无所思，女亦无所忆。昨夜见军帖，可汗大点兵，军书十二卷，卷卷有爷名。阿爷无大儿，木兰无长兄，愿为市鞍马，从此替爷征。东市买骏马，西市买鞍鞯，南市买辔头，北市买长鞭。旦辞爷娘去，暮宿黄河边，不闻爷娘唤女声，但闻黄河流水鸣溅溅。旦辞黄河去，暮至黑山头，不闻爷娘唤女声，但闻燕山胡骑鸣啾啾。 万里赴戎机，关山度若飞。朔气传金柝，寒光照铁衣。将军百战死，壮士十年归。归来见天子，天子坐明堂。策勋十二转，赏赐百千强。可汗问所欲，木兰不用尚书郎；愿驰千里足，送儿还故乡。』 - 《木兰诗》',
        '『 太一况，天马下，沾赤汗，沫流赭。 志俶傥，精权奇，籋浮云，晻上驰。 体容与，迣万里，今安匹，龙为友。』- 《天马》',
        '『 天马徕，从西极，涉流沙，九夷服。 天马徕，出泉水，虎脊两，化若鬼。 天马徕，历无草，径千里，循东道。 天马徕，执徐时，将摇举，谁与期？ 天马徕，开远门，竦予身，逝昆仑。 天马徕，龙之媒，游阊阖，观玉台。』- 《天马》',
        '『 空山新雨后，天气晚来秋。 明月松间照，清泉石上流。 竹喧归浣女，莲动下渔舟。 随意春芳歇，王孙自可留。』- 王维 《山居秋暝》  ',
        '『 高卧南斋时，开帷月初吐。清辉淡水木，演漾在窗户。苒苒几盈虚，澄澄变今古。美人清江畔，是夜越吟苦。千里其如何，微风吹兰杜。』-王昌龄',
        '『 城阙辅三秦，风烟望五津。与君离别意，同是宦游人。海内存知己，天涯若比邻。无为在岐路，儿女共沾巾。』- 唐·王勃《送杜少府之任蜀州》',
        '『 晨起动征铎，客行悲故乡。鸡声茅店月，人迹板桥霜。槲叶落山路，枳花明驿墙。因思杜陵梦，凫雁满回塘。』- 唐·温庭筠《商山早行》',
        '『 海上生明月，天涯共此时。情人怨遥夜，竟夕起相思。灭烛怜光满，披衣觉露滋。不堪盈手赠，还寝梦佳期。』- 唐·张九龄《望月怀远》',
        '『 煮豆持作羹，漉菽以为汁。萁在釜下燃，豆在釜中泣。本是同根生，相煎何太急。』 - 曹植《七步诗》',
        '『 国破山河在，城春草木深。感时花溅泪，恨别鸟惊心。烽火连三月，家书抵万金。白头搔更短，浑欲不胜簪。』- 唐·杜甫《春望》',
        '『 细草微风岸，危樯独夜舟。星垂平野阔，月涌大江流。名岂文章着，官应老病休。飘飘何所似，天地一沙鸥。』- 唐·杜甫《旅夜书怀》',
        '『 挽弓当挽强，用箭当用长。射人先射马，擒贼先擒王。杀人亦有限，立国自有疆。苟能制侵陵，岂在多杀伤。』- 唐·杜甫《前出塞》',
        '『 青青园中葵，朝露待日曦。阳春布德泽，万物生光辉。常恐秋节至，焜黄华叶衰。百川东到海，何时复西归。少壮不努力，老大徒伤悲。』- 《长歌行》',
        '『 我宿五松下，寂寥无所欢。田家秋作苦，邻女夜舂寒。跪进雕胡饭，月光明素盘。令人惭漂母，三谢不能餐。』-唐·李白《宿五松山下荀媪家》',
        '『 去年元夜时，花市灯如昼。月上柳梢头，人约黄昏后。今年元夜时，月与灯依旧。不见去年人，泪湿春衫袖。』- 宋·欧阳修《生查子·元夕》',
        '『 结庐在人境，而无车马喧。问君何能尔，心远地自偏。采菊东篱下，悠然见南山。山气日夕佳，飞鸟相与还。此中有真意，欲辨已忘言。』- 陶潜《饮酒》',
        '『 今朝郡斋冷，忽念山中客。涧底束荆薪，归来煮白石。欲恃一瓢酒，远慰风雨夕。落叶满空山，何处寻行迹。』- 韦应物《寄全椒山中道士》',
        '『 山光忽西落，池月渐东上。散发乘夕凉，开轩卧闲敞。荷风送香气，竹露滴清响。欲取鸣琴弹，恨无知音赏。感此怀故人，中宵劳梦想。』-孟浩然',
        '『 幽意无断绝，此去随所偶。晚风吹行舟，花路入溪口。际夜转西壑，隔山望南斗。潭烟飞溶溶，林月低向后。生事且弥漫，愿为持竿叟。』-綦毋潜',
        '『 凄凄去亲爱，泛泛入烟雾。归桌洛阳人，残钟广陵树。今朝为此别，何处还相遇。世事波上舟，沿洄安得住。』-韦应物 《初发扬子寄元大校书》',
        '『 今朝郡斋冷，忽念山中客。涧底束荆薪，归来煮白石。欲恃一瓢酒，远慰风雨夕。落叶满空山，何处寻行迹。』-韦应物 《寄全椒山中道士》',
        '『 客从东方来，衣上灞陵雨。问客何为来？采山因买斧。冥冥花正开，飏飏燕新乳。昨别今已春，鬓丝生几缕。』- 韦应物 《长安遇冯着》 ',
        '『 落帆逗淮镇，停舫临孤驿。浩浩风起波，冥冥日沉夕。人归山郭暗，雁下芦洲白。独夜忆秦关，听钟未眠客。』- 韦应物 《夕次盱眙县》',
        '『 久为簪组累，幸此南夷谪。闲依农圃邻，偶似山林客。晓耕翻露草，夜榜响溪石。来往不逢人，长歌楚天碧。』- 柳宗元 《溪居》',
        '『 蝉鸣空桑林，八月萧关道。出塞入塞寒，处处黄芦草。从来幽并客，皆共尘沙老。莫学游侠儿，矜夸紫骝好。』- 王昌龄《塞上曲》',
        '『 饮马渡秋水，水寒风似刀。平沙日未没，黯黯见临洮。昔日长城战，咸言意气高。黄尘足今古，白骨乱蓬蒿。』- 王昌龄《塞下曲》',
        '『 一路经行处，莓苔见履痕。 白云依静渚，春草闭闲门。 过雨看松色，随山到水源。 溪花与禅意，相对亦忘言。』- 刘长卿《寻南溪常山道人隐居》 ',
        '『 杳杳寒山道，落落冷涧滨。 啾啾常有鸟，寂寂更无人。 淅淅风吹面，纷纷雪积身。 朝朝不见日，岁岁不知春。』- 寒山 《杳杳寒山道》 ',
        '『 病起萧萧两鬓华，卧看残月上窗纱。豆蔻连梢煎熟水，莫分茶。 枕上诗书闲处好，门前风景雨来佳。终日向人多酝藉，木犀花。』- 李清照 《摊破浣溪沙》',
        '『 蔌蔌衣巾落枣花，村南村北响缲车。半依古柳卖黄瓜。 酒困路长惟欲睡，日高人渴谩思茶。敲门试问野人家。』- 苏轼 《涴花溪》',
        '『 日夕北风紧，寒林噤暮鸦。 是谁谈佛法，真个坠天花。 呵笔难临帖，敲床且煮茶。 禅关堪早闭，应少客停车。』- 大须 《暮雪》 ',
        '『 簌簌衣巾落枣花，村南村北响缲车，牛衣古柳卖黄瓜。 酒困路长惟欲睡，日高人渴漫思茶。敲门试问野人家。』- 苏轼 《浣溪沙》 ',
        '『 红楼别夜堪惆怅，香灯半卷流苏帐。残月出门时，美人和泪辞。 琵琶金翠羽，弦上黄莺语。劝我早归家，绿窗人似花。 』- 韦庄《菩萨蛮》',
        '『 十年离乱后，长大一相逢。 问姓惊初见，称名忆旧容。 别来沧海事，语罢暮天钟。 明日巴陵道，秋山又几重。 』- 李益《喜见外弟又言别》 ',
        '『 寂寂竟何待，朝朝空自归。 欲寻芳草去，惜与故人违。 当路谁相假，知音世所稀。 只应守索寞，还掩故园扉。 』- 孟浩然《留别王侍御维》',
        '『 一点残红欲尽时，乍凉秋气满屏帏。梧桐叶上三更雨，叶叶声声是别离。 调宝瑟，拨金猊，那时同唱鹧鸪词。如今风雨西楼夜，不听清歌也泪垂。 』 - 周紫芝 《鹧鸪天》  ',
        '『 凄凄去亲爱，泛泛入烟雾。 归棹洛阳人，残钟广陵树。 今朝此为别，何处还相遇。 世事波上舟，沿洄安得住！ 』- 韦应物 《初发扬子寄元大校书》',
        '『 玉骨那愁瘴雾，冰肌自有仙风。海仙时遣探芳丛，倒挂绿毛幺凤。 素面常嫌粉涴，洗妆不褪唇红。高情已逐晓云空，不与梨花同梦。 』- 苏轼《西江月·梅》 ',
        '『 谢公最小偏怜女，自嫁黔娄百事乖。 顾我无衣搜荩箧，泥他沽酒拔金钗。 野蔬充膳甘长藿，落叶添薪仰古槐。 今日俸钱过十万，与君营奠复营斋。 』- 元稹《遣悲怀》 ',
        '『 他乡复行役，驻马别孤坟。 近泪无干土，低空有断云。 对棋陪谢傅，把剑觅徐君。 唯见林花落，莺啼送客闻。 』- 杜甫《别房太尉墓》 ',
        '『 帘外五更风，吹梦无踪。画楼重上与谁同？记得玉钗斜拨火，宝篆成空。 回首紫金峰，雨润烟浓。一江春浪醉醒中。留得罗襟前日泪，弹与征鸿。 』- 李清照《浪淘沙》 ',
        '『 闲坐悲君亦自悲，百年都是几多时。 邓攸无子寻知命，潘岳悼亡犹费词。 同穴窅冥何所望，他生缘会更难期。 惟将终夜常开眼，报答平生未展眉。 』- 元稹《遣悲怀》 ',
        '『 客路青山外，行舟绿水前。 潮平两岸阔，风正一帆悬。 海日生残夜，江春入旧年。 乡书何处达，归雁洛阳边。 』- 王湾《次北固山下》 ',
        '『 海上生明月，天涯共此时。 情人怨遥夜，竟夕起相思。 灭烛怜光满，披衣觉露滋。 不堪盈手赠，还寝梦佳期。 』- 张九龄《望月怀远》 ',
        '『 山一程，水一程，身向榆关那畔行。夜深千帐灯。 风一更，雪一更，聒碎乡心梦不成。故园无此声。 』- 纳兰性德《长相思》 ',
        '『 戍鼓断人行，边秋一雁声。 露从今夜白，月是故乡明。 有弟皆分散，无家问死生。 寄书长不达，况乃未休兵。 』- 杜甫《月夜忆舍弟》 ',
        '『 渡远荆门外，来从楚国游。 山随平野尽，江入大荒流。 月下飞天镜，云生结海楼。 仍怜故乡水，万里送行舟。 』- 李白《渡荆门送别》',
        '『 晨起动征铎，客行悲故乡。 鸡声茅店月，人迹板桥霜。 槲叶落山路，枳花明驿墙。 因思杜陵梦，凫雁满回塘。 』- 温庭筠《商山早行》 ',
        '『 木落雁南度，北风江上寒。 我家襄水曲，遥隔楚云端。 乡泪客中尽，孤帆天际看。 迷津欲有问，平海夕漫漫。 』- 孟浩然《早寒江上有怀》 ',
        '『 乡心新岁切，天畔独潸然。 老至居人下，春归在客先。 岭猿同旦暮，江柳共风烟。 已似长沙傅，从今又几年。 』- 刘长卿《新年作》 ',
        '『 别来春半，触目柔肠断。砌下落梅如雪乱，拂了一身还满。 雁来音信无凭，路遥归梦难成。离恨恰如春草，更行更远还生。 』- 李煜《清平乐·忆别》 ',
        '『 迢遰三巴路，羁危万里身。 乱山残雪夜，孤烛异乡人。 渐与骨肉远，转于僮仆亲。 那堪正漂泊，明日岁华新。 』- 崔涂《除夜有怀》 ',
        '『 人人尽说江南好，游人只合江南老。春水碧于天，画船听雨眠。 垆边人似月，皓腕凝霜雪。未老莫还乡，还乡须断肠。 』- 韦庄《菩萨蛮》 ',
        '『 阳月南飞雁，传闻至此回。 我行殊未已，何日复归来。 江静潮初落，林昏瘴不开， 明朝望乡处，应见陇头梅。 』- 宋之问《题大庾岭北驿》 ',
        '『 独有宦游人，偏惊物候新。 云霞出海曙，梅柳渡江春。 淑气催黄鸟，晴光转绿蘋。 忽闻歌古调，归思欲沾巾。 』- 杜审言 《和晋陵陆丞早春游望》',
        '『 缺月挂疏桐，漏断人初静。谁见幽人独往来，缥缈孤鸿影。 惊起却回头，有恨无人省。拣尽寒枝不肯栖，寂寞沙洲冷。 』- 苏轼《卜算子·黄州定慧院寓居作》 ',
        '『 乍暖还轻冷，风雨晚来方定。庭轩寂寞近清明，残花中酒，又是去年病。 楼头画角风吹醒，入夜重门静。那堪更被明月，隔墙送过秋千影。 』- 张先《青门引》 ',
        '『 寂寞掩柴扉，苍茫对落晖。 鹤巢松树遍，人访荜门稀。 绿竹含新粉，红莲落故衣。 渡头烟火起，处处采菱归。 』- 王维《山居即事》 ',
        '『 萧萧几叶风兼雨，离人偏识长更苦。欹枕数秋天，蟾蜍下早弦。 夜寒惊被薄，泪与灯花落。无处不伤心，轻尘在玉琴。 』- 纳兰性德《菩萨蛮·萧萧几叶风兼雨》 ',
        '『 醉里且贪欢笑，要愁那得工夫。近来始觉古人书，信著全无是处。 昨夜松边醉倒，问松「我醉何如」。只疑松动要来扶，以手推松曰「去」！ 』- 辛弃疾《西江月·遣兴》 ',
        '『 青山欲共高人语，联翩万马来无数。烟雨却低回，望来终不来。 人言头上发，总向愁中白。拍手笑沙鸥，一身都是愁。 』- 辛弃疾《菩萨蛮·金陵赏心亭为叶丞相赋》 ',
        '『 精卫衔微木，将以填沧海。 刑天舞干戚，猛志固常在。 同物既无虑，化去不复悔。 徒设在昔心，良辰讵可待！ 』 - 陶渊明《读山海经》 ',
        '『 种豆南山下，草盛豆苗稀。 晨兴理荒秽，带月荷锄归。 道狭草木长，夕露沾我衣。 衣沾不足惜，但使愿无违。 』- 陶渊明 《归园田居》 ',
        '『 清江一曲抱村流，长夏江村事事幽。 自去自来堂上燕，相亲相近水中鸥。 老妻画纸为棋局，稚子敲针作钓钩。 但有故人供禄米，微躯此外更何求。 』- 杜甫 《江村》',
        '『 积雨空林烟火迟，蒸藜炊黍饷东菑。 漠漠水田飞白鹭，阴阴夏木啭黄鹂。 山中习静观朝槿，松下清斋折露葵。 野老与人争席罢，海鸥何事更相疑。 』- 王维《积雨辋川庄作》 ',
        '『 斜阳照墟落，穷巷牛羊归。 野老念牧童，倚杖候荆扉。 雉雊麦苗秀，蚕眠桑叶稀。 田夫荷锄至，相见语依依。 即此羡闲逸，怅然吟式微。 』- 王维《渭川田家》 ',
        '『 明月别枝惊鹊，清风半夜鸣蝉。稻花香里说丰年，听取蛙声一片。 七八个星天外，两三点雨山前。旧时茅店社林边，路转溪桥忽见。 』- 辛弃疾《西江月·夜行黄沙道中》 ',
        '『 茅檐低小，溪上青青草。醉里吴音相媚好，白发谁家翁媪？ 大儿锄豆溪东，中儿正织鸡笼。最喜小儿亡赖，溪头卧剥莲蓬。 』- 辛弃疾《清平乐·村居》 ',
        '『 今古河山无定据，画角声中，牧马频来去。满目荒凉谁可语？西风吹老丹枫树。 从来幽怨应无数？铁马金戈，青冢黄昏路。一往情深深几许？深山夕照深秋雨。 』- 纳兰性德 《蝶恋花·出塞》 ',
        '『 深秋绝塞谁相忆，木叶萧萧。乡路迢迢，六曲屏山和梦遥。 佳时倍惜风光别，不为登高。只觉魂销，南雁归时更寂寥。 』- 纳兰性德 《采桑子·九日》 ',
        '『 燕台一望客心惊，笳鼓喧喧汉将营。 万里寒光生积雪，三边曙色动危旌。 沙场烽火侵胡月，海畔云山拥蓟城。 少小虽非投笔吏，论功还欲请长缨。 』- 祖咏《望蓟门》 ',
        '『 北风卷地白草折，胡天八月即飞雪。 忽如一夜春风来，千树万树梨花开。 散入珠帘湿罗幕，狐裘不暖锦衾薄。 将军角弓不得控，都护铁衣冷难着。 瀚海阑干百丈冰，愁云惨淡万里凝。 中军置酒饮归客，胡琴琵琶与羌笛。 纷纷暮雪下辕门，风掣红旗冻不翻。 轮台东门送君去，去时雪满天山路。 山回路转不见君，雪上空留马行处。 』- 岑参《白雪歌送武判官归京》',
        '『 人生不相见，动如参与商。 今夕复何夕，共此灯烛光。 少壮能几时，鬓发各已苍。 访旧半为鬼，惊呼热中肠。 焉知二十载，重上君子堂。 昔别君未婚，儿女忽成行。 怡然敬父执，问我来何方。 问答乃未已，驱儿罗酒浆。 夜雨剪春韭，新炊间黄粱。 主称会面难，一举累十觞。 十觞亦不醉，感子故意长。 明日隔山岳，世事两茫茫。 』- 杜甫《赠卫八处士》 ',
        '『 把酒祝东风，且共从容。垂杨紫陌洛城东，总是当时携手处，游遍芳丛。 聚散苦匆匆，此恨无穷。今年花胜去年红，可惜明年花更好，知与谁同？ 』- 欧阳修《浪淘沙令》 ',
        '『 舍南舍北皆春水，但见群鸥日日来。 花径不曾缘客扫，蓬门今始为君开。 盘飧市远无兼味，樽酒家贫只旧醅。 肯与邻翁相对饮，隔篱呼取尽馀杯。 』- 杜甫《客至》 ',
        '『 一别都门三改火，天涯踏尽红尘。依然一笑作春温。无波真古井，有节是秋筠。 惆怅孤帆连夜发，送行淡月微云。樽前不用翠眉颦。人生如逆旅，我亦是行人。 』- 苏轼《临江仙 · 送钱穆父》 ',
        '『 东武望馀杭，云海天涯两杳茫。何日功成名遂了，还乡，醉笑陪公三万场。 不用诉离觞，痛饮从来别有肠。今夜送归灯火冷，河塘，堕泪羊公却姓杨。』-  苏轼《南乡子》 ',
        '『 德也狂生耳。偶然间、淄尘京国，乌衣门第。有酒惟浇赵州土，谁会成生此意。不信道、遂成知己。青眼高歌俱未老，向尊前、拭尽英雄泪。君不见，月如水。 』- 纳兰性德 《金缕曲》',
        '『 共君此夜须沉醉。且由他、娥眉谣诼，古今同忌。身世悠悠何足问，冷笑置之而已。寻思起、从头翻悔。一日心期千劫在，后身缘、恐结他生里。然诺重，君须记。 』- 纳兰性德 《金缕曲》',
        '『 我亦飘零久！十年来，深恩负尽，死生师友。宿昔齐名非忝窃，只看杜陵消瘦，曾不减，夜郎僝僽，薄命长辞知己别，问人生到此凄凉否？千万恨，为兄剖。 』- 顾贞观 《金缕曲》 ',
        '『 兄生辛未吾丁丑，共此时，冰霜摧折，早衰蒲柳。词赋从今须少作，留取心魄相守。但愿得，河清人寿！归日急翻行戍稿，把空名料理传身后。言不尽，观顿首。 』- 顾贞观 《金缕曲》',
        '『 山光忽西落，池月渐东上。 散发乘夕凉，开轩卧闲敞。 荷风送香气，竹露滴清响。 欲取鸣琴弹，恨无知音赏。 感此怀故人，终宵劳梦想。 』- 孟浩然《夏日南亭怀辛大》 ',
        '『 江汉曾为客，相逢每醉还。 浮云一别后，流水十年间。 欢笑情如旧，萧疏鬓已斑。 何因北归去，淮上对秋山。 』- 韦应物《淮上喜会梁州故人》 ',
        '『 朝闻游子唱离歌，昨夜微霜初渡河。 鸿雁不堪愁里听，云山况是客中过。 关城曙色催寒近，御苑砧声向晚多。 莫见长安行乐处，空令岁月易蹉跎。 』- 李颀《送魏万之京》',
        '『 一声梧叶一声秋，一点芭蕉一点愁，三更归梦三更后。落灯花，棋未收，叹新丰逆旅淹留。枕上十年事，江南二老忧，都到心头。 』- 徐再思《双调·水仙子·夜雨》 ',
        '『 芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。 黄鹤断矶头，故人今在否？旧江山浑是新愁。欲买桂花同载酒，终不似、少年游。 』- 刘过《唐多令》 ',
        '『 羊角飘尘，金乌烁石，雨凉念秋。有虚堂临水，披襟散发，纱帱雾卷，湘簟波浮。远列云峰，近参荷气，卧看文书琴枕头。蝉声寂，向庄周梦里，栩栩无谋。』- 赵师侠 《沁园春》',
        '『 一别秦楼，转眼新春，又近放灯。忆盈盈倩笑，纤纤柔握；玉香花语，雪暖酥凝。念远愁肠，伤春病思，自怪平生殊未曾。君知否，渐香消蜀锦，泪渍吴绫。』- 陆游 《沁园春》',
        '『 难求系日长绳。况倦客、飘零少旧朋。但江郊雁起，渔村笛怨；寒釭委烬，孤砚生冰。水绕山围，烟昏云惨，纵有高台常怯登。消魂处，是鱼笺不到，兰梦无凭。』- 陆游 《沁园春》',
        '『 兀兀寄形群动内，陶陶任性一生间。 自抛官后春多醉，不读书来老更闲。 琴里知闻唯渌水，茶中故旧是蒙山。 穷通行止长相伴，谁道吾今无往还。』- 白居易 《琴茶》',
        '『 兴亡千古繁华梦，诗眼倦天涯。孔林乔木，吴宫蔓草，楚庙寒鸦。 数间茅舍，藏书万卷，投老村家。山中何事？松花酿酒，春水煎茶。』-  张可久 《山中书事》',
        '『 自古高人最可嗟，只因疏懒取名多。居山一似庚桑楚，种树真成郭橐驼。 云子饭，水精瓜，林间携客更烹茶。君归休矣吾忙甚，要看蜂儿趁晚衙。』- 辛弃疾《鹧鸪天·自古高人最可嗟》 ',
        '『 解语花枝娇朵朵。不爱伤春，爱把眉峰锁。宜笑精神偏一个，微涡媚靥樱桃破。 先自腰肢常袅娜。更被新来，酒饮频过火。茶饭不忺犹自可，脸儿瘦得些娘大。』- 赵师侠《蝶恋花·用宜笑之语作》 ',
        '『 芳草池塘，绿阴庭院，晚晴寒透窗纱。□□金鏁，管是客来唦。寂寞尊前席上，惟□□海角天涯。能留否？酴釄落尽，犹赖有□□。 当年曾胜赏，生香熏袖，活火分茶。□□龙骄马，流水轻车。不怕风狂雨骤，恰才称煮酒残花。如今也，不成怀抱，得似旧时那。』- 李清照 《转调满庭芳·芳草池塘》 ',
        '『 共庆新年笑语哗，红岩士女赠梅花。 举杯互敬屠苏酒，散席分尝胜利茶。 只有精忠能报国，更无乐土可为家。 陪都歌舞迎佳节，遥祝延安景物华。』- 董必武 《元旦口占用柳亚子怀人韵》',
        '『 竹树无声或有声，霏霏漠漠散还凝。 岭梅谢后重妆蕊，岩水铺来却结冰。 牢系鹿儿防猎客，满添茶鼎候吟僧。 好将膏雨同功力，松径莓苔又一层。』- 杜荀鹤 《春日山中对雪有作》 ',
        '『 天上飞琼，毕竟向、人间情薄。还又跨、玉龙归去，万花摇落。云破林梢添远岫，月临屋角分层阁。记少年、骏马走韩庐，掀东郭。吟冻雁，嘲饥鹊。人已老，欢犹昨。对琼瑶满地，与君酬酢。最爱霏霏迷远近，却收扰扰还寥廓。待羔儿、酒罢又烹茶，扬州鹤。』- 辛弃疾 《满江红》',
        '『 霓节飞琼，鸾驾弄玉，杳隔平云弱水。倩皓鹤传书，卫姨呼起。莫待粉河凝晓，趁夜月、瑶笙飞环佩。正蹇驴吟影，茶烟灶冷，酒亭门闭。歌丽。泛碧蚁。放绣帘半钩，宝台临砌。要须借东君，灞陵春意。晓梦先迷楚蝶，早风戾、重寒侵罗被。还怕掩、深院梨花，又作故人清泪。』- 吴文英 《无闷催雪》',
        '『 百战功成翻爱静，侯门渐欲似仙家。 墙头雨细垂纤草，水面风回聚落花。 井放辘轳闲浸酒，笼开鹦鹉报煎茶。 几人图在凌烟阁，曾不交锋向塞沙。』- 张蠙 《夏日题老将林亭》 ',
        '『 绿阴铺野换新光，薰风初昼长。小荷贴水点横塘，蝶衣晒粉忙。 茶鼎熟，酒卮扬，醉来诗兴狂。燕雏似惜落花香，双衔归画梁。』- 张大烈 《阮郎归·立夏》 ',
        '『 小庭幽圃绝清佳，爱此常教放吏衙。 雨后双禽来占竹，秋深一蝶下寻花。 唤人扫壁开吴画，留客临轩试越茶。 野兴渐多公事少，宛如当日在山家。』- 文同 《北斋雨后》',
        '『 昨日东风吹枳花，酒醒春晚一瓯茶。 如云正护幽人堑，似雪才分野老家。 金饼拍成和雨露，玉尘煎出照烟霞。 相如病渴今全校，不羡生台白颈鸦。』- 李郢 《酬友人春暮寄枳花茶》',
        '『 金甲雕戈，记当日、辕门初立。磨盾鼻、一挥千纸，龙蛇犹湿。铁马晓嘶营壁冷，楼船夜渡风涛急。有谁怜、猿臂故将军，无功级。平戎策，从军什。零落尽，慵收拾。把茶经香传，时时温习。生怕客谈榆塞事，且教儿咏花间集。叹臣之壮也不如人，今何及。』- 刘克庄 《满江红》',
        '『 云宿江楼，爱留人夜语，频断灯炷。奈倦情如醉，黑甜清午。谩道迎薰何曾是，簟纹成浪衣成雨。茶瓯注。新期竹院，残梦莲渚。应误。 重帘凄伫。记并刀剪翠，秋扇留句。信那回轻道，而今归否。十二曲阑随意凭，楚天不放斜阳暮。沉吟处。池草暗喧蛙鼓。』- 张榘 《梅子黄时雨》',
        '『 挽住风前柳，问鸱夷当日扁舟，近曾来否？月落潮生无限事，零落茶烟未久。谩留得莼鲈依旧。可是功名从来误，抚荒祠、谁继风流后？今古恨，一搔首。』- 卢祖皋 《贺新郎》',
        '『 江涵雁影梅花瘦，四无尘、雪飞云起，夜窗如昼。万里乾坤清绝处，付与渔翁钓叟。又恰是、题诗时候。猛拍阑干呼鸥鹭，道他年、我亦垂纶手。飞过我，共樽酒。』- 卢祖皋 《贺新郎》',
        '『 遥闻境会茶山夜，珠翠歌钟俱绕身。 盘下中分两州界，灯前合作一家春。 青娥遰舞应争妙，紫笋齐尝各斗新。 自叹花时北窗下，蒲黄酒对病眠人。』- 白居易 《夜闻贾常州崔湖州茶山境会想羡欢宴因寄此诗》',
        '『 天门开，詄荡荡，穆并骋，以临飨。 光夜烛，德信著，灵浸鸿，长生豫。 太朱涂广，夷石为堂，饰玉梢以舞歌，体招摇若永望。 星留俞，塞陨光，照紫幄，珠烦黄。 幡比翅回集，贰双飞常羊。 月穆穆以金波，日华耀以宣明。 假清风轧忽，激长至重觞。 神裴回若留放，殣冀亲以肆章。』- 《天门》',
        '『 青阳开动，根荄以遂，膏润并爱，跂行毕逮。 霆声发荣，壧处顷听，枯槁复产，乃成厥命。 众庶熙熙，施及夭胎，群生啿噬，惟春之祺。』- 《青阳》',
        '『 景星显见，信星彪列，象载昭庭，日亲以察。 参侔开阖，爰推本纪，汾脽出鼎，皇佑元始。 五音六律，依韦飨昭，杂变并会，雅声远姚。 空桑琴瑟结信成，四兴递代八风生。 殷殷钟石羽龠鸣。河龙供鲤醇牺牲。 百末旨酒布兰生。泰尊柘浆析朝酲。 微感心攸通修名，周流常羊思所并。 穰穰复正直往宁，冯蠵切和疏写平。 上天布施后土成，穰穰丰年四时荣。』- 《景星》',
        '『 华晔晔，固灵根。 神之斿，过天门，车千乘，敦昆仑。 神之出，排玉房，周流杂，拔兰堂。 神之行，旌容容，骑沓沓，般纵纵。 神之徕，泛翊翊，甘露降，庆云集。 神之揄，临坛宇，九疑宾，夔龙舞。 神安坐，翔吉时，共翊翊，合所思。 神嘉虞，申贰觞，福滂洋，迈延长。 沛施佑，汾之阿，扬金光，横泰河，莽若云，增阳波。 遍胪欢，腾天歌。』- 《华晔晔》',
        '『 相见时难别亦难，东风无力百花残。 春蚕到死丝方尽，蜡炬成灰泪始干。 晓镜但愁云鬓改，夜吟应觉月光寒。 蓬山此去无多路，青鸟殷勤为探看。』- 李商隐 《无题》',
        '『 蒹葭苍苍，白露为霜。所谓伊人，在水一方。溯洄从之，道阻且长。溯游从之，宛在水中央。蒹葭萋萋，白露未晞。所谓伊人，在水之湄。溯洄从之，道阻且跻。溯游从之，宛在水中坻。蒹葭采采，白露未已。所谓伊人，在水之涘。溯洄从之，道阻且右。溯游从之，宛在水中沚。』 - 《蒹葭》',
        '『 十年生死两茫茫，不思量，自难忘。千里孤坟，无处话凄凉。纵使相逢应不识，尘满面，鬓如霜。夜来幽梦忽还乡，小轩窗，正梳妆。相顾无言，惟有泪千行。料得年年肠断处，明月夜，短松冈。』 - 苏轼 《江城子》',
        '『 关关雎鸠，在河之洲。窈窕淑女，君子好逑。参差荇菜，左右流之。窈窕淑女，寤寐求之。求之不得，寤寐思服。悠哉悠哉，辗转反侧。参差荇菜，左右采之。窈窕淑女，琴瑟友之。参差荇菜，左右芼之。窈窕淑女，钟鼓乐之。』 - 《关雎》',
        '『 纤云弄巧，飞星传恨，银汉迢迢暗度。金风玉露一相逢，便胜却人间无数。柔情似水，佳期如梦，忍顾鹊桥归路。两情若是久长时，又岂在朝朝暮暮？ 』- 秦观《鹊桥仙》',
        '『 君问归期未有期，巴山夜雨涨秋池。 何当共剪西窗烛，却话巴山夜雨时。』- 李商隐 《夜雨寄北》',
        '『 伫倚危楼风细细，望极春愁，黯黯生天际。草色烟光残照里，无言谁会凭阑意。 拟把疏狂图一醉，对酒当歌，强乐还无味。衣带渐宽终不悔，为伊消得人憔悴。』- 柳永 《蝶恋花》',
        '『 寒蝉凄切，对长亭晚，骤雨初歇。都门帐饮无绪，留恋处，兰舟催发。执手相看泪眼，竟无语凝噎。念去去，千里烟波，暮霭沉沉楚天阔。 多情自古伤离别，更那堪、冷落清秋节。今宵酒醒何处？杨柳岸，晓风残月。此去经年，应是良辰好景虚设。便纵有千种风情，更与何人说。』- 柳永 《雨霖铃·秋别》',
        '『 锦瑟无端五十弦，一弦一柱思华年。 庄生晓梦迷蝴蝶，望帝春心托杜鹃。 沧海月明珠有泪，蓝田日暖玉生烟。 此情可待成追忆，只是当时已惘然。』- 李商隐 《锦瑟》',
        '『 其形也，翩若惊鸿，婉若游龙。荣曜秋菊，华茂春松。仿佛兮若轻云之蔽月，飘飖兮若流风之回雪。远而望之，皎若太阳升朝霞；迫而察之，灼若芙蕖出渌波。』- 曹植 《洛神赋》',
        '『 我住长江头，君住长江尾。日日思君不见君，共饮长江水。 此水几时休，此恨何时已。只愿君心似我心，定不负相思意。』- 李之仪 《卜算子》',
        '『 秋风清，秋月明， 落叶聚还散，寒鸦栖复惊。 相思相见知何日？此时此夜难为情。』-李白 《三五七言》',
        '『 去年元夜时，花市灯如昼。月到柳梢头，人约黄昏后。 今年元夜时，月与灯依旧。不见去年人，泪满春衫袖。』- 欧阳修 《生查子·元夕》',
        '『 红酥手，黄縢酒，满城春色宫墙柳。东风恶，欢情薄。一怀愁绪，几年离索。错！错！错！ 春如旧，人空瘦，泪痕红浥鲛绡透。桃花落，闲池阁。山盟虽在，锦书难托。莫！莫！莫。』-陆游 《钗头凤》',
        '『 曾经沧海难为水，除却巫山不是云。 取次花丛懒回顾，半缘修道半缘君。』- 元稹 《离思·其四》 ',
        '『 谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳。 被酒莫惊春睡重，赌书消得泼茶香，当时只道是寻常。』- 纳兰性德 《浣溪沙》 ',
        '『 昨夜星辰昨夜风，画楼西畔桂堂东。 身无彩凤双飞翼，心有灵犀一点通。 隔座送钩春酒暖，分曹射覆蜡灯红。 嗟余听鼓应官去，走马兰台类转蓬。』- 李商隐 《无题》 ',
        '『 静女其姝，俟我于城隅。爱而不见，搔首踟蹰。 静女其娈，贻我彤管。彤管有炜，说怿女美。 自牧归荑，洵美且异。匪女之为美，美人之贻。』- 《国风·邶风·静女》 ',
        '『 问世间、情为何物，直教生死相许？天南地北双飞客，老翅几回寒暑！欢乐趣，离别苦，就中更有痴儿女。君应有语：渺万里层云，千山暮雪，只影向谁去。』- 元好问 《摸鱼儿·雁丘词》',
        '『 千秋万古，为留待骚人，狂歌痛饮，来访雁丘处。』- 元好问 《摸鱼儿》',
        '『 彩袖殷勤捧玉钟，当年拚却醉颜红。舞低杨柳楼心月，歌尽桃花扇底风。 从别后，忆相逢，几回魂梦与君同。今宵剩把银釭照，犹恐相逢是梦中。』- 晏几道 《鹧鸪天》 ',
        '『 飒飒东风细雨来，芙蓉塘外有轻雷。 金蟾啮锁烧香入，玉虎牵丝汲井回。 贾氏窥帘韩掾少，宓妃留枕魏王才。 春心莫共花争发，一寸相思一寸灰。』- 李商隐 《无题》 ',
        '『 红笺小字，说尽平生意。鸿雁在云鱼在水，惆怅此情难寄。 斜阳独倚西楼，遥山恰对帘钩。人面不知何处，绿波依旧东流。』- 晏殊 《清平乐》',
        '『 妾发初覆额，折花门前剧。 郎骑竹马来，绕床弄青梅。 同居长干里，两小无嫌猜。 十四为君妇，羞颜未尝开。 低头向暗壁，千唤不一回。 十五始展眉，愿同尘与灰。 常存抱柱信，岂上望夫台。 十六君远行，瞿塘滟滪堆。 五月不可触，猿声天上哀。 门前迟行迹，一一生绿苔。 苔深不能扫，落叶秋风早。 八月蝴蝶黄，双飞西园草。 感此伤妾心，坐愁红颜老。 早晚下三巴，预将书报家。 相迎不道远，直至长风沙。』- 李白',
        '『 女曰鸡鸣，士曰昧旦。子兴视夜，明星有烂。将翱将翔，弋凫与雁。 弋言加之，与子宜之。宜言饮酒，与子偕老。琴瑟在御，莫不静好。 知子之来之，杂佩以赠之。知子之顺之，杂佩以问之。知子之好之，杂佩以报之。』- 《国风·郑风·女曰鸡鸣》',
        '『 花明月暗笼轻雾，今宵好向郎边去！刬袜步香阶，手提金缕鞋。 画堂南畔见，一晌偎人颤。奴为出来难，教君恣意怜。』- 李煜 《菩萨蛮》',
        '『 来是空言去绝踪，月斜楼上五更钟。 梦为远别啼难唤，书被催成墨未浓。 蜡照半笼金翡翠，麝熏微度绣芙蓉。 刘郎已恨蓬山远，更隔蓬山一万重。』- 李商隐 《无题》',
        '『 阅尽天涯离别苦。不道归来，零落花如许。花底相看无一语，绿窗春与天俱莫。 待把相思灯下诉。一缕新欢，旧恨千千缕。最是人间留不住，朱颜辞镜花辞树。 』- 王国维《蝶恋花·阅尽天涯离别苦》 ',
        '『 有情风、万里卷潮来，无情送潮归。问钱塘江上，西兴浦口，几度斜晖？不用思量今古，俯仰昔人非。谁似东坡老，白首忘机。 记取西湖西畔，正暮山好处，空翠烟霏。算诗人相得，如我与君稀。约他年，东还海道，愿谢公、雅志莫相违。西州路，不应回首，为我沾衣。 』- 苏轼《八声甘州》',
        '『 客从远方来，遗我一端绮。 相去万余里，故人心尚尔。 文彩双鸳鸯，裁为合欢被。 著以长相思，缘以结不解。 以胶投漆中，谁能别离此。 』- 《古诗十九首·客从远方来》',
        '『 绿树听鹈鴂，更那堪、鹧鸪声住，杜鹃声切。啼到春归无寻处，苦恨芳菲都歇。算未抵人间离别，马上琵琶关塞黑，更长门、翠辇辞金阙，看燕燕，送归妾。 将军百战身名裂，向河梁、回头万里，故人长绝。易水萧萧西风冷，满座衣冠似雪。正壮士、悲歌未彻。啼鸟还知如许恨，料不啼、清泪长啼血，谁共我，醉明月？ 』- 辛弃疾 《贺新郎》 ',
        '『 听风听雨过清明，愁草瘗花铭。楼前绿暗分携路，一丝柳、一寸柔情。料峭春寒中酒，交加晓梦啼莺。 西园日日扫林亭，依旧赏新晴。黄蜂频扑秋千索，有当时纤手香凝。惆怅双鸳不到，幽阶一夜苔生。 』- 吴文英《风入松》 ',
        '『 把酒长亭说。看渊明、风流酷似，卧龙诸葛。何处飞来林间鹊，蹙踏松梢微雪。要破帽多添华发。剩水残山无态度，被疏梅料理成风月。两三雁，也萧瑟。 佳人重约还轻别。怅清江、天寒不渡，水深冰合。路断车轮生四角，此地行人销骨。问谁使、君来愁绝？铸就而今相思错，料当初、费尽人间铁。长夜笛，莫吹裂。 』- 辛弃疾 《贺新郎》',
        '『 残寒消尽，疏雨过、清明后。花径敛馀红，风沼萦新皱。乳燕穿庭户，飞絮沾襟袖。正佳时，仍晚昼，著人滋味，真个浓如酒。 频移带眼，空只恁厌厌瘦。不见又思量，见了还依旧，为问频相见，何似长相守。天不老，人未偶，且将此恨，分付庭前柳。 』- 李之仪《谢池春》 ',
        '『 晓阴重，霜凋岸草，雾隐城堞。南陌脂车待发，东门帐饮乍阕。正拂面、垂杨堪揽结，掩红泪、玉手亲折。念汉浦、离鸿去何许？经时信音绝。 情切，望中地远天阔，向露冷、风清无人处，耿耿寒漏咽。嗟万事难忘，惟有轻别。翠尊未竭，凭断云、留取西楼残月。 罗带光消纹衾叠，连环解、旧香顿歇；怨歌永、琼壶敲尽缺。恨春去、不与人期，弄夜色、空余满地梨花雪。 』- 周邦彦《浪淘沙慢》 ',
        '『 老来情味减，对别酒，怯流年。况屈指中秋，十分好月，不照人圆。无情水，都不管，共西风只管送归船。秋晚莼鲈江上，夜深儿女灯前。 征衫，便好去朝天。玉殿正思贤。想夜半承明，留教视草，却遣筹边。长安故人问我，道愁肠殢酒只依然。目断秋霄落雁，醉来时响空弦。 』- 辛弃疾《木兰花慢·滁州送范倅》 ',
        '『 昔日戏言身后意，今朝都到眼前来。 衣裳已施行看尽，针线犹存未忍开。 尚想旧情怜婢仆，也曾因梦送钱财。 诚知此恨人人有，贫贱夫妻百事哀。 』- 元稹《遣悲怀》 ',
        '『 重过阊门万事非，同来何事不同归？梧桐半死清霜后，头白鸳鸯失伴飞。 原上草，露初晞，旧栖新垅两依依。空床卧听南窗雨，谁复挑灯夜补衣！ 』- 贺铸《鹧鸪天·半死桐》 ',
        '『 绿兮衣兮，绿衣黄里。 心之忧矣，曷维其已！ 绿兮衣兮，绿衣黄裳。 心之忧矣，曷维其亡！ 绿兮丝兮，女所治兮。 我思古人，俾无訧兮！ 絺兮绤兮，凄其以风。 我思古人，实获我心！ 』- 《国风·邶风·绿衣》',
        '『 辛苦最怜天上月，一昔如环，昔昔都成玦。若似月轮终皎洁，不辞冰雪为卿热。 无那尘缘容易绝，燕子依然，软踏帘钩说。唱罢秋坟愁未歇，春丛认取双栖蝶。 』- 纳兰性德《蝶恋花》 ',
        '『 塞下秋来风景异，衡阳雁去无留意。四面边声连角起，千嶂里，长烟落日孤城闭。 浊酒一杯家万里，燕然未勒归无计。羌管悠悠霜满地，人不寐，将军白发征夫泪。 』- 范仲淹《渔家傲·秋思》 ',
        '『 昔人已乘黄鹤去，此地空余黄鹤楼。 黄鹤一去不复返，白云千载空悠悠。 晴川历历汉阳树，芳草萋萋鹦鹉洲。 日暮乡关何处是，烟波江上使人愁。 』- 崔颢《黄鹤楼》 ',
        '『 明月出天山，苍茫云海间。 长风几万里，吹度玉门关。 汉下白登道，胡窥青海湾。 由来征战地，不见有人还。 戍客望边邑，思归多苦颜。 高楼当此夜，叹息未应闲。 』- 李白《关山月》 ',
        '『 燎沉香，消溽暑。鸟雀呼晴，侵晓窥檐语。叶上初阳干宿雨，水面清圆，一一风荷举。 故乡遥，何日去？家住吴门，久作长安旅。五月渔郎相忆否？小楫轻舟，梦入芙蓉浦。 』- 周邦彦《苏幕遮》',
        '『 中流欲暮见湘烟，岸苇无穷接楚田。 去雁远冲云梦雪，离人独上洞庭船。 风波尽日依山转，星汉通霄向水悬。 零落梅花过残腊，故园归醉及新年。 』- 李频《湘口送友人》 ',
        '『 东风吹雨过青山，却望千门草色闲。 家在梦中何日到，春来江上几人还？ 川原缭绕浮云外，宫阙参差落照间。 谁念为儒逢世难，独将衰鬓客秦关。 』 - 卢纶《长安春望》 ',
        '『 寻寻觅觅，冷冷清清，凄凄惨惨戚戚。乍暖还寒时候，最难将息。三杯两盏淡酒，怎敌他、晚来风急？雁过也，正伤心，却是旧时相识。 满地黄花堆积。憔悴损，如今有谁堪摘？守著窗儿，独自怎生得黑？梧桐更兼细雨，到黄昏、点点滴滴。这次第，怎一个、愁字了得！ 』- 李清照《声声慢》 ',
        '『 草际鸣蛩，惊落梧桐。正人间、天上愁浓。云阶月地，关锁千重。纵浮槎来，浮槎去，不相逢。 星桥鹊驾，经年才见，想离情、别恨难穷。牵牛织女，莫是离中。甚霎儿晴，霎儿雨，霎儿风。 』 - 李清照《行香子·七夕》 ',
        '『 何处合成愁？离人心上秋，纵芭蕉、不雨也飕飕。都道晚凉天气好，有明月，怕登楼。 年事梦中休，花空烟水流，燕辞归、客尚淹留。垂柳不萦裙带住，漫长是、系行舟。 』- 吴文英《唐多令·惜别》 ',
        '『 碧海年年，试问取、冰轮为谁圆缺？吹到一片秋香，清辉了如雪。愁中看、好天良夜，知道尽成悲咽。只影而今，那堪重对，旧时明月。 花径里、戏捉迷藏，曾惹下萧萧井梧叶。记否轻纨小扇，又几番凉热。只落得，填膺百感，总茫茫、不关离别。一任紫玉无情，夜寒吹裂。 』- 纳兰性德《琵琶仙·中秋》 ',
        '『 白鸥问我泊孤舟，是身留，是心留？心若留时，何事锁眉头？风拍小帘灯晕舞，对闲影，冷清清，忆旧游。 旧游。旧游。今在否？花外楼，柳下舟。梦也梦也，梦不到，寒水空流。漠漠黄云，湿透木棉裘。都道无人愁似我，今夜雪，有梅花，似我愁。 』- 蒋捷《江城梅花引·荆溪阻雪》 ',
        '『 冉冉孤生竹，结根泰山阿。 与君为新婚，菟丝附女萝。 菟丝生有时，夫妇会有宜。 千里远结婚，悠悠隔山陂。 思君令人老，轩车来何迟！ 伤彼蕙兰花，含英扬光辉。 过时而不采，将随秋草萎。 君亮执高节，贱妾亦何为！ 』- 《古诗十九首·冉冉孤生竹》',
        '『 乳燕飞华屋。悄无人、桐阴转午，晚凉新浴。手弄生绡白团扇，扇手一时似玉。渐困倚、孤眠清熟，帘外谁来推绣户？枉教人、梦断瑶台曲，又却是、风敲竹。 石榴半吐红巾蹙。待浮花、浪蕊都尽，伴君幽独。秾艳一枝细看取，芳心千重似束。又恐被、秋风惊绿。若待得君来向此，花前对酒不忍触。共粉泪、两簌簌。 』- 苏轼《贺新郎·夏景》 ',
        '『 怒发冲冠，凭栏处、潇潇雨歇。抬望眼，仰天长啸，壮怀激烈。三十功名尘与土，八千里路云和月。莫等闲，白了少年头，空悲切！ 靖康耻，犹未雪。臣子恨，何时灭？驾长车、踏破贺兰山缺！壮志饥餐胡虏肉，笑谈渴饮匈奴血。待从头、收拾旧山河，朝天阙！ 』- 岳飞 《满江红》',
        '『 醉里挑灯看剑，梦回吹角连营。八百里分麾下炙，五十弦翻塞外声。沙场秋点兵。 马作的卢飞快，弓如霹雳弦惊。了却君王天下事，赢得生前身后名。可怜白发生！ 』- 辛弃疾《破阵子·为陈同甫赋壮词以寄之》',
        '『 独立寒秋，湘江北去，橘子洲头。看万山红遍，层林尽染；漫江碧透，百舸争流。鹰击长空，鱼翔浅底，万类霜天竞自由。怅寥廓，问苍茫大地，谁主沉浮？ 携来百侣曾游，忆往昔峥嵘岁月稠。恰同学少年，风华正茂，书生意气，挥斥方遒。指点江山，激扬文字，粪土当年万户侯。曾记否，到中流击水，浪遏飞舟！ 』- 毛泽东《沁园春·长沙》',
        '『 楚天千里清秋，水随天去秋无际。遥岑远目，献愁供恨，玉簪螺髻。落日楼头，断鸿声里，江南游子。把吴钩看了，栏干拍遍，无人会、登临意。 休说鲈鱼堪脍，尽西风、季鹰归未？求田问舍，怕应羞见，刘郎才气。可惜流年，忧愁风雨，树犹如此。倩何人唤取，红巾翠袖，揾英雄泪。 』- 辛弃疾《水龙吟·登建康赏心亭》 ',
        '『 昨夜寒蛩不住鸣。惊回千里梦，已三更。起来独自绕阶行。人悄悄，帘外月胧明。 白首为功名。旧山松竹老，阻归程。欲将心事付瑶琴，知音少，弦断有谁听？ 』- 岳飞《小重山》 ',
        '『 更能消、几番风雨，匆匆春又归去。惜春长怕花开早，何况落红无数。春且住，见说道、天涯芳草无归路。怨春不语。算只有殷勤、画檐蛛网，尽日惹飞絮。 长门事，准拟佳期又误。蛾眉曾有人妒，千金纵买相如赋，脉脉此情谁诉？君莫舞，君不见、玉环飞燕皆尘土！闲愁最苦，休去倚危栏，斜阳正在，烟柳断肠处。 』- 辛弃疾 《摸鱼儿》 ',
        '『 老大那堪说。似而今、元龙臭味，孟公瓜葛。我病君来高歌饮，惊散楼头飞雪。笑富贵千钧如发。硬语盘空谁来听？记当时、只有西窗月。重进酒，换鸣瑟。 事无两样人心别。问渠侬：神州毕竟，几番离合？汗血盐车无人顾，千里空收骏骨。正目断关河路绝。我最怜君中宵舞，道“男儿到死心如铁”。看试手，补天裂。 』- 辛弃疾 《贺新郎》',
        '『 才饮长沙水，又食武昌鱼。万里长江横渡，极目楚天舒。不管风吹浪打，胜似闲庭信步。今日得宽馀，子在川上曰：“逝者如斯夫”。 风樯动，龟蛇静，起宏图。一桥飞架南北，天堑变通途。更立西江石壁，截断巫山云雨，高峡出平湖。神女应无恙，当惊世界殊。 』- 毛泽东《水调歌头·游泳》 ',
        '『 神龟虽寿，犹有竟时。 腾蛇乘雾，终为土灰。 老骥伏枥，志在千里； 烈士暮年，壮心不已。 盈缩之期，不但在天； 养怡之福，可得永年。 幸甚至哉！歌以咏志。 』-  曹操《步出夏门行·龟虽寿》 ',
        '『 老夫聊发少年狂，左牵黄，右擎苍。锦帽貂裘，千骑卷平冈。为报倾城随太守，亲射虎，看孙郎。 酒酣胸胆尚开张，鬓微霜，又何妨。持节云中，何日遣冯唐？会挽雕弓如满月，西北望，射天狼。 』- 苏轼《江城子·密州出猎》',
        '『 金樽清酒斗十千，玉盘珍羞直万钱。 停杯投箸不能食，拔剑四顾心茫然。 欲渡黄河冰塞川，将登太行雪暗天。 闲来垂钓碧溪上，忽复乘舟梦日边。 行路难，行路难，多歧路，今安在？ 长风破浪会有时，直挂云帆济沧海！ 』 -  李白《行路难》',
        '『 大道如青天，我独不得出。羞逐长安社中儿，赤鸡白狗赌梨栗。弹剑作歌奏苦声，曳裾王门不称情。淮阴市井笑韩信，汉朝公卿忌贾生。君不见昔时燕家重郭隗，拥彗折节无嫌猜。剧辛乐毅感恩分，输肝剖胆效英才。昭王白骨萦蔓草，谁人更扫黄金台？行路难，归去来！ 』 -  李白《行路难》',
        '『 有耳莫洗颍川水，有口莫食首阳蕨。含光混世贵无名，何用孤高比云月？吾观自古贤达人，功成不退皆殒身。子胥既弃吴江上，屈原终投湘水滨。陆机雄才岂自保？李斯税驾苦不早。华亭鹤唳讵可闻？上蔡苍鹰何足道？君不见吴中张翰称达生，秋风忽忆江东行。且乐生前一杯酒，何须身后千载名？ 』 -  李白《行路难》',
        '『 辛苦遭逢起一经，干戈寥落四周星。 山河破碎风飘絮，身世浮沉雨打萍。 惶恐滩头说惶恐，零丁洋里叹零丁。 人生自古谁无死？留取丹心照汗青！ 』- 文天祥《过零丁洋》 ',
        '『 少无适俗韵，性本爱丘山。 误落尘网中，一去三十年。 羁鸟恋旧林，池鱼思故渊。 开荒南野际，守拙归园田。 方宅十馀亩，草屋八九间。 榆柳荫后檐，桃李罗堂前。 暧暧远人村，依依墟里烟。 狗吠深巷中，鸡鸣桑树颠。 户庭无尘杂，虚室有馀闲。 久在樊笼里，复得返自然。 』- 陶渊明《归园田居》 ',
        '『 每个人都有自己的故事，或悲或喜或无奈，不接触深了，你永远都不知道这一个个经过的人心心里装着的事，亮着灯的一扇扇窗里有没有在叹息。』 — 《撒野》 ',
        '『 命运如同一团乱麻，我们抽丝剥茧百般追寻，最终终于解开了这个线团，却发现所有人手里都拿错了线头…』 — 《希灵帝国》 ',
        '『 那一年我二十一岁，在我一生的黄金时代，我有好多奢望：我想爱，想吃，还想在一瞬间变成天上半明半暗的云。』 — 《黄金时代》 ',
        '『 过去都是假的，回忆是一条没有归途的路，以往的一切春天都无法复原，即使最狂热最坚贞的爱情，归根结底也不过是一种瞬息即逝的现实，唯有孤独永恒。』 — 《百年孤独》 ',
        '『 迈出第一步的是他，迈出第二步的也是他，一步一步的都是他。但害怕的也是他，一惊一乍的同样是他。』—《撒野》 ',
        '『 我们这种人，生来就是要毁灭一些东西。前面是山，我们就爬山，前面是海，我们就渡海，前面是皇宫 ，我们就开炮🚀！』—《龙族》 ',
        '『 所有坚硬冰冷的东西都会永远坚硬冰冷下去，而所有柔软温暖的东西只有眼下才会柔软温暖。』 — 《（以色列）阿摩司·奥兹》 ',
        '『 一个人的胆子大，才能有作为；畏怯的人，懦弱的人，他虽然没有身临其境的危险，但只要一听到人家的恐吓言语，早已吓得不知所措，试问这样的人可能有什么建树呢？』— 戴尔·卡耐基',
        '『 一个顽强坚持自己在正义事业中的目标的人是不会因同伴发疯似地狂叫“错了”而动摇决心，也不会因暴君威胁恫吓的脸色而恐惧退缩。』— 贺拉斯',
        '『 鲁莽往往以勇敢的名义出现，但它是另一回事，并不属于美德；勇敢直接来源于谨慎，而鲁莽则出于愚蠢和想当然。』— 凯瑟琳·雷恩',
        '『 哪有斩不断的荆棘？哪有打不死的豺虎？哪有推不翻的山岳？你只须奋斗着，猛勇地奋斗着；持续着，永远的持续着，胜利就是你的了。』— 邓中夏',
        '『 要坚强，要勇敢，不要让绝望和庸俗的忧愁压倒你，要保持伟大的灵魂在经受苦难时的豁达与平静。』— 亚米契斯',
        '『 只要你坚持的时间足够长，在恐惧之中的某一时刻来到之后，恐惧就根本不再是极端的痛苦，而不过是一种十分讨厌，令人恼火的刺激。』— 福克纳',
        '『 在科学上面是没有平坦的大路可走的，只有那在崎岖小路的攀登上不畏劳苦的人，才有希望到达光辉的顶点。』— 马克思',
        '『 历史的道路不是涅瓦大街上的人行道，它完全是在田野中前进的，有时穿过尘埃，有时穿过泥泞，有时横渡沼泽，有时行经丛林。』— 车尔尼雪夫斯基',
        '『 英勇是一种力量，但不是腿部和臂部的力量，而是心灵和灵魂的力量，这力量并不存在于战马和武器价值之中，而是存在于我们自身之中。』— 蒙田',
        '『 我们要时时注意，勇气常常是盲目的，因为它没有看见隐伏在暗中的危险与困难，因此，勇气不利于思考，但却有利于实干。因为在思考时必须预见到危险，而在实干中却必须顾及危险，除非那危险是毁灭性的。所以对于有勇无谋的人，只能让他们做帮手，而绝不能当领袖。』— 培根',
        '『 勇敢来自于斗争，勇敢在同困难顽强奋斗中渐形成。我们青年人的座右铭就是勇敢，顽强，坚定，就是克服艰难险阻…… 』— 奥斯特洛夫斯基',
        '『 伟大人物的最明显标志，就是他坚强的意志，不管环境变换到何种地步，他的初衷与希望仍不会有丝毫的改变，而终于克服障碍，以达到期望的目的。』— 爱迪生',
        '『 真正勇敢的人，应当能够智慧地忍受最难堪的荣辱，不以身外的荣辱介怀，用息事宁人的态度避免无谓的横祸。』— 莎士比亚',
        '『 刚强的人尽管在内心很激动，但他们的见解和信念却像在暴风雨中颠簸船上的罗盘指针，仍能准确地指出方向。』— 克劳塞维茨',
        '『 你为人像水一般软弱。这一点人家很快就会发现的。他们不用费什么劲就会发现你为人没有骨气。他们可以像对付一个奴隶一样对付你。』— 马克·吐温',
        '『 百丈之台，其始则一石耳，由是而二石焉，由是而三石，四石以至于千万石焉。学习亦然。今日记一事，明日悟一理，积久而成学。』— 毛泽东',
        '『 莫笑农家腊酒浑，丰年留客足鸡豚。 山重水复疑无路，柳暗花明又一村。 箫鼓追随春社近，衣冠简朴古风存。 从今若许闲乘月，拄杖无时夜叩门。 』- 陆游 《游山西村》',
        '『 善不可失，恶不可长，其陈桓公之谓乎！长恶不悛，从自及也。虽欲救之，其将能乎？《商书》曰：『恶之易也，如火之燎于原，不可乡迩，其犹可扑灭？ 』 - 《左传·隐公》 ',
        '『 山下兰芽短浸溪，松间沙路净无泥。潇潇暮雨子规啼。 谁道人生无再少，君看流水尚能西。休将白发唱黄鸡。 』- 苏轼 《浣溪沙·游蕲水清泉寺》',
        '『 大凡治事，必需通观全局，不可执一而论。昔人有专浚吴淞而舍刘河、白茅者，亦有专治刘河而舍吴淞、白茅者，是未察三吴水势也。 』- 钱泳《履园丛话·水学·三江》 ',
        '『 滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。青山依旧在，几度夕阳红。 白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。古今多少事，都付笑谈中。 』- 杨慎《临江仙》 ',
        '『 江流有声，断岸千尺；山高月小，水落石出。曾日月之几何，而江山不可复识矣。予乃摄衣而上，履巉岩，披蒙茸，踞虎豹，登虬龙，攀栖鹘之危巢，俯冯夷之幽宫。盖二客不能从焉。划然长啸，草木震动，山鸣谷应，风起水涌。予亦悄然而悲，肃然而恐，凛乎其不可留也。反而登舟，放乎中流，听其所止而休焉。 』 - 苏轼 《后赤壁赋》',
        '『 靠别人亮起来的光迟早是要熄灭的，你得自己学着明亮起来。』',
        '『 征服世界，并不伟大，一个人能征服自己，才是世界上最伟大的人。 』',
        '『 把自己的欲望降到最低点，把自己的理性升华到最高点，就是圣人。 』',
        '『 嫉妒别人，仇视异己，就等于把生命交给别人。 』',
        '『 一个人如果不被恶习所染，幸福近矣。 』',
        '『 诽谤别人，就象含血喷人，先污染了自己的嘴巴。 』',
        '『 平安是幸，知足是福，清心是禄，寡欲是寿。 』',
        '『 人之心胸，多欲则窄，寡欲则宽。 』',
        '『 宁可清贫自乐，不可浊富多忧。 』',
        '『 受思深处宜先退，得意浓时便可休。 』',
        '『 势不可使尽，福不可享尽，便宜不可占尽，聪明不可用尽。 』',
        '『 滴水穿石，不是力量大，而是功夫深。 』',
        '『 平生不做皱眉事，世上应无切齿人。 』',
        '『 须交有道之人，莫结无义之友。饮清静之茶，莫贪花色之酒。开方便之门，闲是非之口。 』',
        '『 多门之室生风，多言之人生祸。』',
        '『 世事忙忙如水流，休将名利挂心头。粗茶淡饭随缘过，富贵荣华莫强求。 』',
        '『 “我欲”是贫穷的标志。事能常足，心常惬，人到无求品自高。 』',
        '『 人生至恶是善谈人过；人生至愚恶闻己过。 』',
        '『 诸恶莫做，众善奉行，莫以善小而不为，莫以恶小而为之。 』',
        '『 莫妒他长，妒长，则己终是短。莫护己短，护短，则己终不长。 』',
        '『 做事不必与俗同，亦不宜与俗异。做事不必令人喜，亦不可令人憎。 』',
        '『 世上有两件事不能等：一、孝顺。二、行善。 』',
        '『 存平等心，行方便事，则天下无事。怀慈悲心，做慈悲事，则心中太平。 』',
        '『 心量狭小，则多烦恼，心量广大，智慧丰饶。 』',
        '『 平生无一事可瞒人，此是大快。 』',
        '『 “恶”,恐人知，便是大恶。“善”,欲人知，不是真善。 』',
        '『 扶危周急固为美事。能不自夸，则其德厚矣！ 』',
        '『 遇顺境，处之淡然，遇逆境，处之泰然。 』',
        '『 是非天天有，不听自然无。 』',
        '『 五官刺激，不是真正的享受。内在安祥，才是下手之处。 』',
        '『 人为善， 福虽未至， 祸已远离； 人为恶， 祸虽未至， 福已远离。 』',
        '『 不妄求， 则心安， 不妄做， 则身安。 』',
        '『 不自重者， 取辱。 不自长者， 取祸。 不自满者， 受益。 不自足者， 博闻。 』',
        '『 积金遗于子孙， 子孙未必能守； 积书于子孙， 子孙未必能读。 不如积阴德于冥冥之中， 此乃万世传家之宝训也。 』',
        '『 积德为产业， 强胜于美宅良田。』',
        '『 能付出爱心就是福， 能消除烦恼就是慧。』',
        '『 身安不如心安， 屋宽不如心宽。』',
        '『 罗马人凯撒大帝， 威震欧亚非三大陆， 临终告诉侍者说：“ 请把我的双手放在棺材外面， 让世人看看， 伟大如我凯撒者， 死后也是两手空空。』',
        '『 梦中冥冥有乐趣， 觉后空空无大千。』',
        '『 儿孙自有儿孙福， 莫为儿孙做远忧。』',
        '『 择善人而交， 择善书而读， 择善言而听， 择善行而从。』',
        '『 一个人的快乐， 不是因为他拥有的多， 而是因为他计较的少。』',
        '『 生气， 就是拿别人的过错来惩罚自己。 原谅别人， 就是善待自己。』',
        '『 未必钱多乐便多， 财多累己招烦恼。 清贫乐道真自在， 无牵无挂乐逍遥。』',
        '『 静坐常思己过， 闲谈莫论人非， 能受苦乃为志士， 肯吃亏不是痴人， 敬君子方显有德， 怕小人不算无能， 退一步天高地阔， 让三分心平气和， 欲进步需思退步， 若着手先虑放手， 如得意不宜重往， 凡做事应有余步。 持黄金为珍贵， 知安乐方值千金， 事临头三思为妙， 怒上心忍让最高。 切勿贪意外之财， 知足者人心常乐。 若能以此去处事， 一生安乐任逍遥。』',
        '『 处事不必求功， 无过便是功。 为人不必感德， 无怨便是德。』',
        '『 恨别人， 痛苦的却是自己。』',
        '『 人之所以平凡， 在于无法超越自己。』',
        '『 大肚能容， 断却许多烦恼障， 笑容可掬， 结成无量欢喜缘。』',
        '『 改变自己， 是自救， 影响别人， 是救人。』',
        '『 谎言像一朵盛开的鲜花， 外表美丽， 生命短暂。』',
        '『 唯其尊重自己的人， 才更勇于缩小自己。』',
        '『 人不求福， 斯无祸。 人不求利， 斯无害。』',
        '『 智者顺时而谋， 愚者逆时而动。』',
        '『 常常责备自己的人， 往往能得到他人的谅解。』',
        '『 见己不是， 万善之门。 见人不是， 诸恶之根。』',
        '『 学一分退让， 讨一分便宜。 增一分享受， 减一分福泽。』',
        '『 念头端正， 福星临， 念头不正， 灾星照。』',
        '『 善人行善， 从乐入乐， 从明入明。 恶人行恶， 从苦入苦， 从冥入冥。』',
        '『 心慈者， 寿必长。 心刻者， 寿必促。』',
        '『 骨宜刚， 气宜柔， 志宜大， 胆宜小， 心宜虚， 言宜实， 慧宜增， 福宜惜， 虑不远， 忧亦近。』',
        '『 苦口的是良药， 逆耳必是忠言。 改过必生智慧。 护短心内非贤。』',
        '『 你目前拥有的， 都将随着你的死亡而成为他人的。 那为何不现在就布施给真正需要的人呢？』',
        '『 人之所以痛苦， 在于追求错误的东西。』',
        '『 人生最大的敌人是自己。 人生最大的失败是自大。 人生最大的愚蠢是欺骗。 人生最可怜的是嫉妒。 人生最大的错误是自卑。 人生最大的痛苦是痴迷。 人生最大的羞辱是献媚。 人生最危险的境地是贪婪。 人生最烦恼的是争名利。 人生最大的罪过是自欺欺人。 人生最可怜的性情是自卑。 人生最大的破产是绝望。 人生最大的债务是人情债。 人生最大的罪过是杀生。 人生最可恶的是淫乱。 人生最善良的行为是奉献。 人生最大的幸福是放得下。 人生最大的欣慰是布施。 人生最大的礼物是宽恕。 人生最可佩服的是精进。 人生最大的财富是健康。 人生最高的享受是学佛。 人生最大的快乐是念佛。』',
        '『 心好命也好， 富贵直到老。 命好心不好， 福转为祸兆。 心好命不好， 祸转为福报。 心命具不好， 遭殃且贫夭。 心可挽乎命， 最要存人道。 命实造于心， 祸福为人招， 信命不修心， 阴阳恐虚矫。 修心亦听命， 天地自相保。』',
        '『 寡言养气， 寡事养神， 寡思养精， 寡念养性。』',
        '『 改变别人， 不如先改变自己。』',
        '『 感激伤害你的人， 因为他磨练了你的心志。 感激欺骗你的人， 因为他增进了你的见识。 感激鞭打你的人， 因为他消除了你的业障。 感激遗弃你的人， 因为他教导了你应自立。 感激绊倒你的人， 因为他强化了你的能力。 感激斥责你的人， 因为他助长了你的定慧。 感激所有使你坚定成就的人。』',
        '『 凡夫迷失于当下， 后悔于过去、 圣人觉悟于当下， 解脱于未来。』',
        '『 节欲戒怒， 是保身法， 收敛安静， 是治家法， 随便自然， 是省事法， 行善修心是出世法。 守此四法， 结局通达。』',
        '『 人生就象一场戏， 因为有缘才相聚。 相扶到老不容易， 是否更该去珍惜。 为了小事发脾气， 回头想想又何必。 别人生气我不气， 气出病来无人替。 我若气死谁如意？ 况且伤神又费力。 邻居亲不要比， 儿孙琐事由他去， 吃苦享乐在一起， 神仙羡慕好伴侣。』',
        '『 忍人所不能忍， 行人所不能行。 名：” 大雄“.故名：” 大雄宝殿“.即佛也。』',
        '『 忍耐好， 忍耐是奇宝。 一朝之念不能忍， 斗胜争强祸不小。 忍气不下心病生， 终生将你苦缠绕， 让人一步有何妨， 量大福大无烦恼。』',
        '『 寒山问拾得： 世人有人谤我、 欺我、 辱我、 笑我、 轻我、 贱我， 我当如何处之？ 拾得曰： 只要忍他、 避他、 由他、 耐他、 不要理他， 再过几年， 你且看他。』',
        '『 忍一时， 风平浪静， 退一步， 海阔天空。』',
        '『 恶是犁头， 善是泥， 善人常被恶人欺， 铁打犁头年年坏， 未见田中换烂泥。』',
        '『 气是无明火， 忍是敌灾星， 但留方寸地， 把于子孙耕。』',
        '『 屈己者， 能处众， 好胜者， 必遇敌。』',
        '『 事不三思总有败， 人能百忍自无忧。』',
        '『 是非以不辩为解脱， 烦恼以忍辱为智慧， 办事以尽力为有功。』',
        '『 万事得成于忍， 与其能辩， 不如能忍。』',
        '『 伤人之语， 如水覆地， 难以挽回。』',
        '『 时时好心， 就是时时好日。』',
        '『 话多不如话少， 话少不如话好。』',
        '『 得理要饶人， 理直气要和。』',
        '『 不怕事多， 只怕多事。』',
        '『 真正的布施， 是把烦恼、 忧虑、 分别、 执着、 通通放下。』',
        '『 一念放下， 万般自在。』',
        '『 学佛就是学做人。 佛法， 就是完成生命觉醒的方法， 修行， 就是修正自己的行为、 思想、 见解。』',
        '『 圣人求心， 不求佛； 愚人求佛不求心。』',
        '『 凡夫转境不转心。 圣人转心不转境。』',
        '『 知” 因果“ 即知进退。 知佛法， 即得开心果。』',
        '『 欲知过去世， 今生受者是。 欲知来世果， 今生做者是。』',
        '『 若真修道人， 不见世间过。』',
        '『 智者知幻即离， 愚者以幻为真。』',
        '『 世间有为法， 如梦幻泡影， 如露亦如电， 应作如是观。』',
        '『 学佛的孩子不变坏， 学佛的老人不痴呆， 学佛的少年永不败。』',
        '『 不惜光阴过时悔， 黑发不学白发悔。 酒色赌博致祸悔， 安不将息病时悔。 官行贿赂致罪悔， 富不勤俭贫时悔。 不孝父母老时悔， 遇难不帮有事悔。 动不三思临头悔， 盲目草率错时悔。』',
        '『 困难像弹簧，你弱它就强，你强它就弱。』',
        '『 山高路遥不足惧，最怕贪图安逸心。』',
        '『 贪图省力的船夫，目标永远下游。』',
        '『 机遇永远是准备好的人得到的。』',
        '『 马行软地易失蹄，人贪安逸易失志。』',
        '『 没有人能改变你，别人只能影响你，能改变你的只有你自己。』',
        '『 成功是别人失败时还在坚持。』',
        '『 信心源于实力,实力源于不断的努力。 』',
        '『 昨天已逝，明日是谜，面对今朝，尽力而为！』',
        '『 拥有梦想只是一种智力，实现梦想才是一种能力。』',
        '『 每一日你所付出的代价都比前一日高，因为你的生命又消短了一天，所以每一日你都要更积极。』',
        '『 只有满怀自信的人，才能在任何地方都怀有自信地沉浸在生活中，并实现自己的意志。』',
        '『 没有等出来的辉煌；只有走出来的美丽。』',
        '『 学在苦中求，艺在勤中练。不怕学问浅，就怕志气短。』',
        '『 山路曲折盘旋，但毕竟朝着顶峰延伸。』',
        '『 志坚智达言信行果，失败的尽头是成功努力的终点是辉煌。』',
        '『 善于利用时间的人，永远找得到充裕的时间。』',
        '『 只有经历地狱般的磨练，才能炼出创造天堂的力量。』',
        '『 环境永远不会十全十美，消极的人受环境控制，积极的人却控制环境。』',
        '『 沙漠之所以美丽，是因为在不远处有一片绿洲。』',
        '『 其实我们往往失败不是在昨天，而是失败在没有很好利用今天。』',
        '『 无情岁月增中减，有味青春苦甜。集雄心壮志，创锦绣前程。』',
        '『 勤奋的含义是今天的热血，而不是明天的决心，后天的保证。』',
        '『 不比智力，比努力；不比起步，比进步。』',
        '『 当今之世，舍我其谁！』',
        '『 穿透石头的水滴，它的力量来源于日积月累。』',
        '『 登高山务攻绝顶，赏大雪莫畏严寒。』',
        '『 可以失败，不可以失志；可以失望，不可以绝望。』',
        '『 谁要游戏人生，他就一事无成；谁不能主宰自己，永远是一个奴隶。』',
        '『 我从不怀疑自己的能力，只怀疑自己有没有努力。』',
        '『 愚蠢的人总是为昨天悔恨，为明天祈祷，可惜的是少了今天的努力。』',
        '『 为了最好的结果，让我们把疯狂进行到底。』',
        '『 努力永远不会骗人，总有一天你会发现你的坚持回报了你的期许。』',
        '『 当你认为自己倾尽全力时，往往才是别人的起点。』',
        '『 上一秒已成过去，曾经的辉煌，仅仅是是曾经。』',
        '『 大成功者，非疯，即颠。你的激情能达到那种程度，离你的成功就不会很远了。』',
        '『 要成功，先发疯，头脑简单向前冲。』',
        '『 如果不努力，未来只能是个梦。』',
        '『 没有什么不可能，只看你去不去做。』',
        '『 坚强，不是面对悲伤不流一滴泪，而是擦干眼泪后微笑着面对以后的生活。』',
        '『 该坚持时就坚持，以不变应万变；该改变时就改变，以万变应不变。』',
        '『 生活中难免遭遇打击。但是，真正能把你击倒的是你的态度。』',
        '『 不能天生丽质就只能天生励志！』',
        '『 人生苦难重重。这是个伟大的真理，是世界上最伟大的真理之一。』',
        '『 要想青春不留遗憾，小伙必须敢想敢干。』',
        '『 我们渴望成功，首先要志在成功。』',
        '『 假如你知道自己这样做并没有错的话，那么，你就继续做下去。』',
        '『 哪怕遍体鳞伤也要活的漂亮。』',
        '『 正是这些平凡的人生，却构成了伟大的历史。』',
        '『 相信自己，相信一切，加油！』',
        '『 炫丽的彩虹，永远都在雨过天晴后。』',
        '『 一切都不是自己想怎样就怎样的，活着就要学会身不由己。』',
        '『 环境不会改变，解决之道在于改变自己。』',
        '『 征服畏惧建立自信的最快最确实的方法，就是去做你害怕的事，直到你获得成功的经验。』',
        '『 学问多深也别满足，过失多小也别忽略。』',
        '『 该发生的总会发生，不管你是否为此焦虑。向前走，向前看，生活就这么简单。每一个坚强的人，都有一颗柔软的心，摆正心态，温柔自相随，哭给自己听，笑给别人看，这就是所谓的人生。』',
        '『 要乐观，要积极，多笑，多照镜子。』',
        '『 要使整个人生都过得舒适愉快，这是不可能的，因为人类必须具备一种能应付逆境的态度。』— 卢梭 ',
        '『 要铭记在心：每天都是一年中最美好的日子。』',
        '『 顺境时，多一份思索；逆境时，多一份勇气；成功时，多一份淡然；彷徨时，多一份信念。』',
        '『 走得最远的人常是愿意去做愿意去冒险的人。』',
        '『 把困难举在头上，它就是灭顶石；把困难踩在脚下，它就是垫脚石。』',
        '『 时间是化解证明表白一切的最好良方。有些东西往往越辩解越扯不清，就让时间去解决吧。』',
        '『 我们只有一条命，要卖给识货的人。』',
        '『 我们最终都要远行，最终都要跟稚嫩的自己告别。也许路途有点艰辛，有点孤独，但熬过了痛苦，我们才能得以成长。』',
        '『 每个人都会有乐观的心态，每个人也会有悲观的现状，可事实往往我们只能看到乐观的一面，却又无视于悲观的真实。从来没有人喜欢过悲观，也没有人能够忍受悲观，这就是人生。』',
        '『 每天醒来，敲醒自己的不是钟声，而是梦想。』',
        '『 每种创伤，都是种成熟。』',
        '『 你可以倒下，但是要记得站起来；你可以流泪，但是要记得长大。』',
        '『 你若不给自己输的可能，你也不会有赢的机会。』',
        '『 希望是生命的源泉，失去它生命就会枯萎。』',
        '『 没有目标的人，努力有什么用。』',
        '『 即使在平坦的道路也会有荆棘坎坷，人的命运也一样。』',
        '『 即使跌倒了，也要漂亮的站起来再哭。』',
        '『 泉水，奋斗之路越曲折，心灵越纯洁。』',
        '『 很多时候都是这样，你赢了时间，你就赢了一切。』',
        '『 强大的信心，能克服来自内心的恶魔，产生无往不胜的勇气。』',
        '『 频频回头的人，自然走不了远路。人活着，就就应往前看，只留给世界一个背影。』',
        '『 漫无目的的生活就像出海航行而没有指南针。』',
        '『 踩着垃圾到达的高度和踩着金子到达的高度是一样的。』',
        '『 人在的时候，以为总会有机会，其实人生就是减法，见一面少一面。』',
        '『 人要有梦想，有了梦想才会努力奋斗，人生才会更有意义。如果没有梦想，那就只能做庸人。』',
        '『 人总爱跟别人比较，看看有谁比自己好，又有谁比不上自己。而其实，为你的烦恼和忧伤垫底的，从来不是别人的不幸和痛苦，而是你自己的态度。』',
        '『 下对注，赢一次；跟对人，赢一世。』',
        '『 上有天，下有地，中间站着你自己，做一天人，尽一天人事儿。』',
        '『 天下无难事，只怕有心人。』',
        '『 不吃油腻的东西，让身体更清洁；不做不可及的梦，让睡眠更安恬；不穿不合脚的鞋，让步伐更悠闲；不跟无谓的潮流走，让情绪更宁静；不缅怀无法回头的过去，让生活更愉悦用心去爱，真诚去交，不求深刻，只求简单。简单每一天，愉悦每一天。』',
        '『 不要言过其实夸大其词会使人怀疑你的判断力。精明的人表现出的是严谨，有时还会故意缩小其词。』',
        '『 不是每件事都注定会成功，但是每件事都值得一试。』',
        '『 当你为自己想要的东西而忙碌的时候，就没有时间为不想要的东西而担忧了。』',
        '『 当你觉的累的时候就看看那些还在努力的人。』',
        '『 自己选择的路，跪着也要把它走完。』',
        '『 尽自己最大的努力，抱最大的希望，作最坏的打算。』',
        '『 如果人生的旅程上没有障碍，人还有什么可做的呢。』',
        '『 亲人是父母给你找的朋友，朋友是你给自己找的亲人，所以同等重要，孰轻孰重没那么多分别。』',
        '『 逆风的方向，更适合飞翔。』',
        '『 总有些事，管你愿不愿意，它都要发生，你只能接受；总有些东西，管你躲不躲避，它都要来临，你只能面对。』',
        '『 活得糊涂的人，容易幸福；活得清醒的人，容易烦恼。这是因为，清醒的人看得太真切，一较真，生活中便烦恼遍地；而糊涂的人，计较得少，虽然活得简单粗糙，却因此觅得了人生的大滋味。』',
        '『 给心灵留一方净土，给生活留一个梦想，给未来留一丝微笑，给岁月留一份厚礼，给人生留一季花香。』',
        '『 如果说我懂的道理比别人多一点，那是因为我犯的错误比别人多一点。』',
        '『 连信任都是一种奢侈的时候，那幸福更是遥不可及。』',
        '『 时光，因爱而温润；岁月，因情而丰盈，毕竟我们经历着，便懂得着，感念着，便幸福着。』',
        '『 时间多反而容易使人懒散，缺乏动力，效率低。』',
        '『 吹嘘自己有知识的人，等于在宣扬自己的无知。』',
        '『 别低头，王冠会掉；别流泪，坏人会笑。』',
        '『 我们用人生最好的年华作抵押，去担保一个说出来都会被嘲笑的梦想。』',
        '『 我们自己选择的路，即使跪着也要走完；因为一旦开始，便不能终止。这才叫做真正的坚持。』',
        '『 我们确实有如是的优点，但也要隐藏几分，这个叫做涵养。』',
        '『 每个人内心深处都渴望成功，可问题是大多数认为自己无法成功，他们不相信通过奋斗可以成功，于是放弃了梦想，最终果然走向了失败。』',
        '『 每次需要人陪的时候,才发现,有的人不能找,有的人不该找,有的人找不到。』',
        '『 功到自然成，成功之前难免有失败，然而只要能克服困难，坚持不懈地努力，那么，成功就在眼前。』',
        '『 只要比竞争对手活得长，你就赢了。』',
        '『 只要你在路上，就不要放弃前进的勇气，走走停停的生活会一直继续。』',
        '『 只要路是对的，就不怕路远。』',
        '『 生命匆匆，不必委曲求全，做自己喜欢做的事，才是最重要的。』',
        '『 生命如同一根火柴，只有磨砺才会跳跃出灿烂的火花。』',
        '『 生活从来都不会停止推你向前，保持专注，别因为后悔而放慢脚步。微笑，原谅，遗忘，然后继续向前。』',
        '『 记住只要活着其他的都不是个事儿。』',
        '『 永远不要走捷径，便捷而陌生的路，可能要了你的命。』',
        '『 对于尚未成熟的人来说，自由就是散漫。』',
        '『 在人生的道路上，想哭就哭，想笑就笑吧，只是别忘记赶路。』',
        '『 有谦和愉快诚恳的态度，而同时又加上忍耐精神的人，是非常幸运的。』',
        '『 成功之花，人们往往惊羡它现时的明艳，然而当初，它的芽儿却浸透了奋斗的泪泉，洒满了牺牲的血雨。』',
        '『 成功是一个过程，并不是一个结果。』',
        '『 减少蜗居时间，亲近大自然。』',
        '『 如果放弃太早，你永远都不知道自己会错过什么。』',
        '『 你不要一直不满人家，你应该一直检讨自己才对。不满人家，是苦了你自己。』',
        '『 你热爱生命吗？那幺别浪费时间，由于时间是组成生命的材料。』',
        '『 这个世界不会因为你的付出就必须给予回报，也不会因为你以怎样的方式对待别人，就要求他人同等对待你。人活在这世上，最难的就是保持一份谦卑和平和，而这份谦卑，来源于内心的真诚和踏实的努力。』',
        '『 这个世界不是有钱人的世界，也不是无钱人的世界，它是有心人的世界。』',
        '『 这世上，时光会改变太多事情，但总有一些人一些事，只要你相信，就永远不会改变。』',
        '『 灿烂的犹如初开的太阳的面纱，灵秀的犹如崖边的一只百合，热情的犹如一株红色的玫瑰，散发着撩人的芬芳，她让我如此深深着迷。』',
        '『 忧伤并不是人生绝境坎坷并非无止境，没有谁能剥夺你的欢乐，因为欢乐是心灵结出的果实。欢乐将指引你在人生正确方向里寻找自己的错误，寻找自己人生的正确目标，并执著的走下去。』',
        '『 忍别人所不能忍的痛，吃别人所不能吃的苦，是为了收获别人得不到的收获。』',
        '『 现实一点，爱情在现实面前总是那么苍白，别以为灰姑娘的事情会在你身上发生，那是可遇而不可求的。』',
        '『 顶天立地奇男子，要把乾坤扭转来。』',
        '『 幸福就像香水，洒给别人也一定会感染自己。』',
        '『 其实旅行最大的好处，不是能见到多少人，见过多美的风景，而是走着走着，在一个际遇下，突然重新认识了自己。』',
        '『 所谓内心的快乐，是一个人过着健全的正常的和谐的生活所感人生所有的欢乐是创造的欢乐：爱情天才行动——全靠创造这一团烈火进射出来的。』',
        '『 实力加自信就是一把坚韧不摧的利剑，也是通往成功的船票实力决定成败。』',
        '『 积极向上的心态，是成功者的最基本要素。』',
        '『 从今开始，我要帮自己一个忙：卸下负担忘却疼痛抚平创伤。』',
        '『 一个人幸运的前提，是他有能力改变自己。』',
        '『 只要你不回避与退缩，生命的掌声终会为你响起。』',
        '『 成功的人永远只有办法，失败的人永远只有理由。』',
        '『 如果你看到前面的阴影，别怕，那是因为你背后有阳光。』',
        '『 人生最大的成就是从失败中站起来。』',
        '『 离开奋斗的沃壤，天赋的种子便寻不到春华秋实的前程。』',
        '『 路灯经过一夜的努力，才无愧地领受第一缕晨光的抚慰。』',
        '『 无论何时，都要做好独自生活的准备。』',
        '『 命运如同手中的掌纹，无论多曲折，终掌握在自己手中。』',
        '『 不必因昨天的眼泪，湿了今天的太阳。』',
        '『 我宁愿不断犯错，也不愿什么都不做。』',
        '『 欲戴王冠，必承其重。』',
        '『 活在当下，做在当下。』',
        '『 有梦想的人睡不着，没梦想的人睡不醒。』',
        '『 总要有一个人要赢，为什么不能是我。』',
        '『 别让情绪左右着你的每一天。』',
        '『 就算很失望，笑容依然要灿烂。』',
        '『 了解过去，活在当下，为将来做好准备。』',
        '『 要像溺水的人渴望呼吸一样渴望成功，一秒钟也不能松懈，不然你觉得你凭什么赢。』',
        '『 人生只有创造才能前进；只有适应才能生存。』',
        '『 人生短短数十载，最要紧是证明自己，不是讨好他人。』',
        '『 一个人若想学会滑冰，那么他一定要做好在冰上摔跤的准备。』',
        '『 成功与失败都是暂时的，在成功处跌到便是失败，在失败处勇敢站起就是成功。』',
        '『 如果做某一件事能给我带来好心情，那么无论遇到什么样的挫折，我都会竭力去做。』',
        '『 在成功的道路上，激情是需要的，志向是可贵的，但更重要的是那毫无情趣的近乎平常的坚守的毅力和勇气。』',
        '『 你吃过的苦会照亮未来的路。』',
        '『 越努力，越幸运，若是不幸运，就一定是不够努力。』',
        '『 撑不住的时候可以说我好累但永远不要说我不行。』',
        '『 不要做下一个谁，要做第一个我。』',
        '『 只要努力抬起你的双脚，胜利将属于你。』',
        '『 做前，可以环视四周；做时，你只能或者最好沿着以脚为起点的射线向前。』',
        '『 破釜沉舟博他个日出日落，背水一战拼他个无怨无悔。』',
        '『 你不努力怎么知道你不是奇迹。』',
        '『 我虽然是穷人的后代，但我要作富人的祖先。』',
        '『 纵不能万丈光芒，也要倒在追梦的路上。』',
        '『 有一种落差是，你配不上自己的野心，也辜负了所受的苦难。』',
        '『 努力吧，为了以后能以完美的姿态出现在当初否定你的人面前。』',
        '『 你现在活的越欢，将来命运越会给你拉清单。』',
        '『 没有什么年少轻狂，只有胜者为王。』',
        '『 每天肩上新增的不是痛苦，是沉稳的素养。』',
        '『 梦由自己来创造，路由自己来走好。』',
        '『 只为成功找方法，不为失败找借口。』',
        '『 溪流的秀美是因为它脚下的路坎坷不平。』',
        '『 天下没有不可能的事，只要你有信心、有勇气，腔子里有热血，灵魂里有真爱。』',
        '『 与其相信依靠别人，不如相信依靠自己。』',
        '『 把生活中的每一天，都当作生命中的最后一天。』',
        '『 浪花总是着扬帆者的路开放的。』',
        '『 大江东去，浪淘尽、千古风流人物。故垒西边，人道是、三国周郎赤壁。乱石穿空，惊涛拍岸，卷起千堆雪。江山如画，一时多少豪杰。 遥想公瑾当年，小乔初嫁了，雄姿英发。羽扇纶巾，谈笑间，樯橹灰飞烟灭。故国神游，多情应笑我，早生华发。人生如梦，一尊还酹江月。 』- 苏轼《念奴娇·赤壁怀古》 ',
    ];
    let index = Math.floor(Math.random() * arr.length);
    index = index < arr.length ? index : arr.length - 1;
    return arr[index];
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
    let event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, true);
    event.eventType = 'message';
    window.dispatchEvent(event);
}

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
    if (!(typeof obj == 'object')) {
        return;
    }

    for (var key in obj) {
        if (
            obj.hasOwnProperty(key) &&
            (obj[key] == null || obj[key] == undefined || obj[key] === '')
        ) {
            delete obj[key];
        }
    }
    return obj;
}

/**
 * 时间格式化
 * @param value
 * @param fmt
 * @returns {*}
 */
export function formatDate(value, fmt) {
    //如果时间格式含有T，yyyy-MM-ddThh:mm:ss,yyyy-MM-ddThh:mm:ss.SSSZ，这样做可以自动把+0:00时区的时间转为+8:00的时间
    if (typeof value == 'string' && value.includes('T')) {
        value = new Date(value);
    }

    //正则表达式
    var regPos = /^\d+(\.\d+)?$/;

    if (regPos.test(value) || value instanceof Date) {
        //如果是数字
        let getDate = value instanceof Date ? value : new Date(value);
        let o = {
            'M+': getDate.getMonth() + 1,
            'd+': getDate.getDate(),
            'h+': getDate.getHours(),
            'm+': getDate.getMinutes(),
            's+': getDate.getSeconds(),
            'q+': Math.floor((getDate.getMonth() + 3) / 3),
            S: getDate.getMilliseconds(),
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (getDate.getFullYear() + '').substr(4 - RegExp.$1.length)
            );
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ?
                    o[k] :
                    ('00' + o[k]).substr(('' + o[k]).length)
                );
            }
        }

        try {
            fmt = fmt.replace('T', ' ');
        } catch (error) {
            console.log('formate date error : ' + error);
        }

        return fmt;
    } else {
        //TODO
        try {
            if (typeof value == 'undefined' || value == null) {
                value = '--';
            }
            value = value.trim();
            fmt = value.substr(0, fmt.length);
            fmt = fmt.replace('T', ' ');
        } catch (error) {
            console.log('formate date error : ' + error);
        }

        return fmt;
    }
}

/**
 * @function 过滤空对象
 * @param {*} data
 */
export function deNull(data, defaultValue = '') {
    try {
        if (typeof data == 'undefined' || data == null || data == '' || JSON.stringify(data) == "{}") {
            return defaultValue;
        } else {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * @function 过滤空对象
 * @param {*} data
 */
export function isNull(data) {
    try {
        if (typeof data == 'undefined' || data == null || data == '' || JSON.stringify(data) == "{}") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

export function isBlank(data) {
    try {
        return isNull(data);
    } catch (error) {
        console.log(error);
    }
}

// 生成首页路由
export function generateIndexRouter(data) {
    let indexRouter = [{
            path: '/',
            name: 'dashboard',
            component: resolve =>
                require(['@/components/layouts/TabLayout'], resolve),
            meta: {
                title: '首页',
            },
            redirect: '/dashboard/analysis',
            children: [...generateChildRouters(data)],
        },
        {
            path: '/',
            name: 'dashboard',
            component: resolve =>
                require(['@/components/layouts/TabLayout'], resolve),
            meta: {
                title: '工作台',
            },
            redirect: '/dashboard/workplace',
            children: [...generateChildRouters(data)],
        },
        {
            path: '*',
            redirect: '/404',
            hidden: true,
        },
    ];
    return indexRouter;
}

// 生成嵌套路由（子路由）

function generateChildRouters(data) {
    const routers = [];
    for (var item of data) {
        let component = '';
        if (item.component.indexOf('layouts') >= 0) {
            component = 'components/' + item.component;
        } else {
            component = 'views/' + item.component;
        }

        // eslint-disable-next-line
        let URL = (item.meta.url || '')
            .replace(/{{([^}}]+)?}}/g, (s1, s2) => eval(s2)); // URL支持{{ window.xxx }}占位符变量
        if (isURL(URL)) {
            item.meta.url = URL;
        }

        let menu = {
            path: item.path,
            name: item.name,
            redirect: item.redirect,
            component: resolve => require(['@/' + component + '.vue'], resolve),
            hidden: item.hidden,
            meta: {
                title: item.meta.title,
                icon: item.meta.icon,
                url: item.meta.url,
                permissionList: item.meta.permissionList,
                keepAlive: item.meta.keepAlive,
            },
        };
        if (item.alwaysShow) {
            menu.alwaysShow = true;
            menu.redirect = menu.path;
        }
        if (item.children && item.children.length > 0) {
            menu.children = [...generateChildRouters(item.children)];
        }
        //判断是否生成路由
        if (item.route && item.route === '0') {
            //console.log(' 不生成路由 item.route：  '+item.route);
            //console.log(' 不生成路由 item.path：  '+item.path);
        } else {
            routers.push(menu);
        }
    }
    return routers;
}

/**
 * 深度克隆对象、数组
 * @param obj 被克隆的对象
 * @return 克隆后的对象
 */
export function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * @function clone对象
 * @param {*} obj 被克隆对象
 */
export function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * 随机生成数字
 *
 * 示例：生成长度为 12 的随机数：randomNumber(12)
 * 示例：生成 3~23 之间的随机数：randomNumber(3, 23)
 *
 * @param1 最小值 | 长度
 * @param2 最大值
 * @return int 生成后的数字
 */
export function randomNumber() {
    // 生成 最小值 到 最大值 区间的随机数
    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    if (arguments.length === 1) {
        let [length] = arguments;
        // 生成指定长度的随机数字，首位一定不是 0
        let nums = [...Array(length).keys()].map(
            i => (i > 0 ? random(0, 9) : random(1, 9))
        );
        return parseInt(nums.join(''));
    } else if (arguments.length >= 2) {
        let [min, max] = arguments;
        return random(min, max);
    } else {
        return Number.NaN;
    }
}

/**
 * 随机生成字符串
 * @param length 字符串的长度
 * @param chats 可选字符串区间（只会生成传入的字符串中的字符）
 * @return string 生成的字符串
 */
export function randomString(length, chats) {
    if (!length) length = 1;
    if (!chats) chats = '0123456789qwertyuioplkjhgfdsazxcvbnm';
    let str = '';
    for (let i = 0; i < length; i++) {
        let num = randomNumber(0, chats.length - 1);
        str += chats[num];
    }
    return str;
}

/**
 * 随机生成uuid
 * @return string 生成的uuid
 */
export function randomUUID() {
    let chats = '0123456789abcdef';
    return randomString(32, chats);
}

/**
 * 下划线转驼峰
 * @param string
 * @returns {*}
 */
export function underLine2CamelCase(string) {
    return string.replace(/_([a-z])/g, function(all, letter) {
        return letter.toUpperCase();
    });
}

/**
 * 判断是否显示办理按钮
 * @param bpmStatus
 * @returns {*}
 */
export function showDealBtn(bpmStatus) {
    if (bpmStatus != '1' && bpmStatus != '3' && bpmStatus != '4') {
        return true;
    }
    return false;
}

/**
 * 增强CSS，可以在页面上输出全局css
 * @param css 要增强的css
 * @param id style标签的id，可以用来清除旧样式
 */
export function cssExpand(css, id) {
    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `@charset "UTF-8"; ${css}`;
    // 清除旧样式
    if (id) {
        let $style = document.getElementById(id);
        if ($style != null) $style.outerHTML = '';
        style.id = id;
    }
    // 应用新样式
    document.head.appendChild(style);
}

/**
 * 检查字符串是否包含中文
 * @param {*} val
 */
export function existChinese(val) {
    var reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
    return reg.test(val);
}

/**
 * 获取URL参数值
 * @param {*} val
 */
export function queryUrlString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 获取URL参数值
 * @param {*} val
 */
export function queryUrl(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * @function 检测字符串是否包含字符函数
 * @param {*} origin 
 * @param {*} arg 
 */
export function contain(origin, arg) {

    //设置前后缀信息
    origin = `,${origin},`;

    //设置包含的用户
    var ready = '';

    //设置数组信息
    var array = null;

    try {
        array = arg.split(',');

        //遍历数据，并查询出含有的用户数据
        for (var item of array) {
            ready = origin.includes(item) ? `${ready},${item}` : ready;
        }

    } catch (error) {
        console.log(error);
    }

    //去掉字符串开头的逗号
    if (ready.startsWith(',')) {
        ready = ready.substring(1);
    }

    //去掉字符串结尾的逗号
    if (ready.endsWith(',')) {
        ready = ready.substring(0, ready.length - 1);
    }

    //返回包含的用户数据
    return ready;
}

/**
 * 计算两个日期之间的天数
 */
export function queryDateDiff(date1, date2) {
    //如果被解析日期格式为字符串，则先将字符串解析为日期格式
    if (Object.prototype.toString.call(date1).includes('String')) {
        try {
            date1 = parseDate(formatDate(date1, 'yyyy-MM-dd hh:mm:ss'));
            date2 = parseDate(formatDate(date2, 'yyyy-MM-dd hh:mm:ss'));
        } catch (e) {
            date1 = parseDate(date1);
            date2 = parseDate(date2);
        }
    }

    var beginDate = date1;
    var endDate = date2;

    //日期差值,即包含周六日、以天为单位的工时，86400000=1000*60*60*24.
    var workDayVal = (endDate - beginDate) / 86400000;
    //工时的余数
    var remainder = workDayVal % 7;
    //工时向下取整的除数
    var divisor = Math.floor(workDayVal / 7);
    var weekendDay = 2 * divisor;

    //起始日期的星期，星期取值有（1,2,3,4,5,6,0）
    var nextDay = beginDate.getDay();
    //从起始日期的星期开始 遍历remainder天
    for (var tempDay = remainder; tempDay >= 1; tempDay--) {
        //第一天不用加1
        if (tempDay == remainder) {
            nextDay = nextDay + 0;
        } else if (tempDay != remainder) {
            nextDay = nextDay + 1;
        }
        //周日，变更为0
        if (nextDay == 7) {
            nextDay = 0;
        }

        //周六日
        if (nextDay == 0 || nextDay == 6) {
            weekendDay = weekendDay + 1;
        }
    }
    //获取含有小数位的天数
    var timeFloat = parseFloat(workDayVal);
    //获取整数位的天数
    var timeInt = parseInt(workDayVal);
    //实际工时（天） = 起止日期差 - 周六日数目。
    workDayVal = parseInt(workDayVal - weekendDay);

    //取相差天数的小数位
    var decpart = timeFloat - timeInt;

    //如果小数位的天数大于0.5（3小时），按一天统计，如果大于0，按半天统计
    if (decpart * 24 > 4) {
        decpart = 1;
    } else if (decpart > 0) {
        decpart = 0.5;
    } else {
        decpart = 0;
    }

    return workDayVal + decpart;
}

/**
 * @function 字符串转为日期
 * @param {*} date
 */
export function parseDate(date) {
    var t = Date.parse(date);
    try {
        if (!isNaN(t)) {
            return new Date(Date.parse(date.replace(/-/g, '/')));
        }
    } catch (error) {
        console.log(error);
    }
    return new Date();
}

/**
 * @function 解析JSON对象
 * @param {*} json
 */
export function parseJSON(json) {
    try {
        return JSON.parse(json);
    } catch (e) {
        console.log('err', e);
    }
    return [];
}

/**
 * 清理空值，对象
 * @param children
 * @returns {*[]}
 */
export function filterEmpty(children = []) {
    return children.filter(c => c.tag || (c.text && c.text.trim() !== ''))
}

/**
 * @function 去除字符串中html标签
 * @param {*} str 
 */
export function delHtmlTag(str) {
    try {
        if (isNull(str)) {
            return ""; //去掉所有的html标记
        } else {
            return deNull(str).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, ""); //去掉所有的html标记
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * @function 字符串缩略函数
 * @param {*} str 
 */
export function abbreviation(str) {
    try {

        if (deNull(str).length < 75) {
            return deNull(str).trim();
        } else {
            return deNull(str).trim().substring(0, 75) + '...';
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * @function 合成唯一编码
 */
export function queryUniqueID() {
    //日期格式化
    var timestamp = new Date().getTime();
    //定义动态编码
    var id = formatDate(timestamp, "yyyyMMddhhmmssS");
    //打印日志
    console.log('动态编号 :' + id);
    //定义随机编码
    var random = (Math.floor(Math.random() * 100000000000000000000) + "") + (Math.floor(Math.random() * 100000000000000000000) + "");
    //打印随机编码
    console.log('随机编号 :' + random);
    //合成动态编码
    id = (id + random).replace(/\./g, '').substring(0, 32);
    //返回唯一编码
    return id;
}