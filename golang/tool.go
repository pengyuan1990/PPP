func NumberStrAddSplitWithoutDecimal(sale string) string{
	integerPart := sale
	decimalPart := ""
	index := strings.LastIndex(sale,".")
	if index != -1{
		integerPart = sale[:index]
		decimalPart = sale[index:]
	}
	result := ""
	count := len(integerPart)
	if count <=3 {
		return integerPart+decimalPart
	}
	for i,v := range integerPart{
		vt := string(v)
		if count%3==0 {// (i+1)%3==0添加
			if (i+1)%3 ==0 && i != count-1 {
				result = result + vt +","
			}else {
				result +=  vt
			}
		}else if count%3==1{ // i%3 == 0
			if i%3 ==0&& i != count-1 {
				result = result +  vt +","
			}else{
				result +=  vt
			}
			continue
		}else if count%3==2{// (i-1)%3==0
			if (i-1)%3 ==0&& i != count-1 {
				result = result + vt +","
			}else{
				result +=  vt
			}
		}
	}
	return result+decimalPart
}
func FormatNumbers(rewards string)string{
	var result []string
	list := strings.Split(rewards,"")
	kmgStrings.Reverse(list)
	for i,v := range list{
		if i%3==0&&i!=0{
			result = append(result,v+",")
		}else{
			result = append(result,v)
		}
	}
	kmgStrings.Reverse(result)
	return strings.Join(result,"")
}
func MaskUserName(name string)string{
	n := []rune(name)
	count := len(n)
	left  := count - 1
	mask := ""
	result := string(n[0])
	if count > 3{
		result = string(n[0:3])
		left = count - 3
	}
	for i:=0;i<left;i++{
		mask += "*"
	}
	result += mask
	return result
}
