## dns 解析总结

* DNS 查找步骤：
  1. 询问Resolver
  2. 询问根服务器
  3. 询问顶级域名服务器 (可以没有)
  4. 询问次级域名服务器
- Resolver 提供域名服务器地址，返回所有根域名的地址，根据速度进行排序[返回根服务器(a-m)[root-server.net]]
- 根据速度最快的跟域名服务器地址，查询下层服务器地址"一般来说,根服务器处理DNS请求,并且告诉resolver下一步应该去询问哪个顶级服务器. 不过如果根服务器识别出了 次级服务器的地址,就会把这个地址返回给resolver的":[返回顶级或者次级服务器:通用域名(gTLD-generic TLD)：.com, .net, .org, .biz, .info 国别顶级域名(ccTLD-country side TLD):.cn, .us, .ru (a-m)[gtld-servers.net]]
- 如果跟服务器没有识别出“次级域名服务器”，那就会返回一个顶级服务器的地址:顶级域名(TLD-Top-Level Domains)分为两部分，否则返回次级域名服务器:[返回次级服务器:如图nina.ns.cloudflare.com]
- 根据上层的返回的继续查找
- 通过上面的查询结果可以看出：A表示ipv4，NS表示对于的服务器
- AAAA表示ipv6，CNAME可以用于指定别名，在解析别名的dns时，其实是指向的原来的域名
- MX 为DNS域名指定邮件交换服务器信息，将邮件发送到正确的主机上。所以每次在弄了新的域名之后都会去配置一堆的submail的信息
- TXT 格式不限，就是因为这次在帮运营配置facebook的时候需要到cloudflare上面配置这么一项，我就把这些全部看了一下。我认为是与安全验证差不多的东西。
### [参考文档](https://evilpan.com/2017/01/08/dns-fundamentals/)