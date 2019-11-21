* white-space、word-break、word-wrap（overflow-wrap）由于这次三个属性彻底搞清楚
   * white-space：normal | nowrap | pre | pre-wrap | pre-line:空格和换行符的处理
      * normal：合并空格，换行符无效，句子超过一行后会自动换行，而长度超过一行的单个单词会超出边界
      * nowrap：合并空格，换行符无效，自动换行无效，
      * pre：空格和换行符都被保留，换行符无效，没有自动换行
      * pre-wrap:保留空格和换行符，且可以自动换行(pre + wrap)
      * pre-line:空格被合并了，但是换行符可以发挥作用，自动换行还在
   * word-break:normal | break-all | keep-all：这个属性是控制单词如何被拆分换行的
      * normal：不拆分
      * break-all：所有单词碰到边界一律拆分换行
      * keep-all：所有“单词”(没有空格)一律不拆分换行
   * word-wrap(overflow-wrap)：normal | break-word:这个属性也是控制单词如何被拆分换行的
      * normal:不拆分
      * break-word:只有当一个单词一整行都显示不下时，才会拆分换行该单词
