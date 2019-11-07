# radial-gradient:使用示例[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/radial-gradient)，[快速使用参考](https://www.zhangxinxu.com/wordpress/2017/11/css3-radial-gradient-syntax-example/)
   * radial-gradient是一个函数最终获取一个gradient类型对象
      * 结束边缘形状：椭圆/圆
      ```
      Formal grammar: radial-gradient( [ circle || <length> ] [ at <position> ]? ,
                                    | [ ellipse || [<length> | <percentage> ]{2}] [ at <position> ]? ,
                                    | [ [ circle | ellipse ] || <extent-keyword> ] [ at <position> ]? ,
                                    | at <position> ,
                                    <color-stop> [ , <color-stop> ]+ )
      ```
   * 平铺背景:
       ```css
        .grepeat-circle-bg{
            background: radial-gradient(circle, rgba(235,116,231,0.1), rgba(235,116,231,0.1) 6px, transparent 0);
            background-size: 50px 50px;
            background-repeat: repeat;
        }
       ```
