## mouseenter/mouseover VS mouseleave/mouseout

* mouseenter只会在进入绑定当前事件的dom节点是会调用移出//mouseleave: 只有鼠标指针移出事件所绑定的元素时，才会触发该事件
* mouseover从子元素中进行进入dom时也会触发就算是进入子元素也会触发//mouseout: 只要鼠标指针移出事件所绑定的元素或其子元素，都会触发该事件(本质上就算鼠标事件的冒泡操作，从子元素冒泡到绑定事件的父元素)(总结就是只要在本身和子元素中进行了dom切换都触发,而且out事件先与over事件触发)
* 父子结构：在通过mouseenter和mouseleave实现hover事件的时候，尽量将hover需要显示的内容设置为hover节点的子元素，这样当移动的子元素的时候不会触发leave操作(就算子元素的范围超出了父元素的范围也不会触发leave)。!如果是父子元素结构over和out事件也可以满足需求，因为从父元素进入子元素的时候，先执行的out，再执行over，所以还是会显示hover结果，不过触发的频率就比较高!
* 非父子结构同时存在交叉：
   * mouseenter/mouseleave:当hover到hover显示的内容的话存在抖动效果。抖动原因：因为不存在父子结构，当hover的动态显示内容的时候，会立刻触发leave事件，隐藏动态显示内容，然后又立刻Enter到hover事件元素导致马上显示动态内容，如此循环。。。可以通过relatedTarget判断进入元素前的上个元素信息进行优化
   * mouseover/mouseout:非父子结构的话和Enter，leave效果一样。
   * 防止抖动鬼畜的方式：兄弟结构hoverDom,DynamicDom, 包裹节点：ParentDom 
       * hoverDom监听mouseenter和mouseleave，DynamicDom监听mouseleave事件
       * hoverDom的mouseenter事件正常操作，只要进入就显示DynamicDom。但是mouseleave事件需要判断relatedTarget，如果relateTarget等于它所有对应的DynamicDom的时候(即从hoverDom进入动态显示内容)，直接退出而不隐藏DynamicDom，否则隐藏DynamicDom
       * DynamicDom的mouseleave事件判断relateTarget，如果relateTarget是他对应的hoverDom直接退出不隐藏(从动态显示内容又返回到hoverDom)，否则隐藏DynamicDom