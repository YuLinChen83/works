#要進位/借位
def degit(level,op)
num1=Array.new
num2=Array.new
    if level==1
    n=rand(2)+1
    elsif level ==2
    n=rand(2)+3
    else
    n=rand(2)+5
    end

if op==1
    k=0
    while k!=n
    num1[k]=rand(9)+1
    num2[k]=rand(9)+1
        if (num1[k]+num2[k])>10
        k=k+1
        end
    end

    n1=0
    n2=0
    k=0
    c=n
    while c>0
    n1=n1+num1[k]*(10**(c-1))
    n2=n2+num2[k]*(10**(c-1))
    c=c-1
    k=k+1
    end  
      #生成兩運算數字 加法進位
    
elsif op==2    #減法
    k=0
    m=0
    
    while k!=n
        num1[k]=rand(9)+1
        num2[k]=rand(9)+1
        now=num1[k]-num2[k]
        if   now<0 &&k!=0
           
            
            k=k+1
        
        elsif now>0&&k==0 
            
            k=k+1
            
        else    
            
            
        end    
    end

    n1=0
    n2=0
    k=0
    c=n
    while c>0
        n1=n1+num1[k]*(10**(c-1))
        n2=n2+num2[k]*(10**(c-1))
        c=c-1
        k=k+1
    end  
          #生成兩運算數字 加法不進位
        
elsif op==3   #乘法

k=0
    while k!=n
    num1[k]=rand(9)+1
    num2[k]=rand(9)+1
        if (num1[k]*num2[k])>10
        k=k+1
        end
    end

n1=0
n2=0
k=0
c=n
    while c>0
    n1=n1+num1[k]*(10**(c-1))
    n2=n2+num2[k]*(10**(c-1))
    c=c-1
    k=k+1
    end  
      #生成兩運算數字 加法不進位
    

else  op==4||op==5 #除法
k=0
    while k!=n
    num1[k]=rand(9)+1
    num2[k]=rand(9)+1
    
        if num1[k]%num2[k]!=0&&k!=0
        k=k+1
          
        elsif num1[k]>num2[k]&&k==0
        k=k+1
        
        else
        end
    end

n1=0
n2=0
k=0
c=n
    while c>0
    n1=n1+num1[k]*(10**(c-1))
    n2=n2+num2[k]*(10**(c-1))
    c=c-1
    k=k+1
    end  
end

return n1,n2
end




#不進位不借位
def degit2(level,op)
num1=Array.new
num2=Array.new
if level==1
n=rand(2)+1
elsif level ==2
n=rand(2)+3
else
n=rand(2)+5
end

if op==1
k=0
while k!=n
    num1[k]=rand(9)+1
    num2[k]=rand(9)+1
    if (num1[k]+num2[k])<10
        k=k+1
    end
end

n1=0
n2=0
k=0
c=n
while c>0
    n1=n1+num1[k]*(10**(c-1))
    n2=n2+num2[k]*(10**(c-1))
    c=c-1
    k=k+1
end  
      #生成兩運算數字 加法進位
    
elsif op==2    #減法
    k=0
    while k!=n
        num1[k]=rand(9)+1
        num2[k]=rand(9)+1
        if (num1[k]-num2[k])>0
            k=k+1
        end
    end

    n1=0
    n2=0
    k=0
    c=n
    while c>0
        n1=n1+num1[k]*(10**(c-1))
        n2=n2+num2[k]*(10**(c-1))
        c=c-1
        k=k+1
    end  
          #生成兩運算數字 加法不進位
        
elsif op==3   #乘法

k=0
while k!=n
    num1[k]=rand(9)+1
    num2[k]=rand(9)+1
    if (num1[k]*num2[k])<10
        k=k+1
    end
end

n1=0
n2=0
k=0
c=n
while c>0
    n1=n1+num1[k]*(10**(c-1))
    n2=n2+num2[k]*(10**(c-1))
    c=c-1
    k=k+1
end  
      #生成兩運算數字 加法不進位
    

elsif  op==4||op==5 #除法
k=0
while k!=n
    num1[k]=rand(9)+1
    num2[k]=rand(9)+1
    if (num1[k]%num2[k])==0
        k=k+1
    end
end

n1=0
n2=0
k=0
c=n
while c>0
    n1=n1+num1[k]*(10**(c-1))
    n2=n2+num2[k]*(10**(c-1))
    c=c-1
    k=k+1
end  
end

return n1,n2
end

ss=true
while ss
puts "============================================================"
puts "	加減乘除四則運算電腦輔助教學(CAI)"
puts "1. 先輸入預作答的題數"
puts "2. 決定 初(0~99)/中(100~9999)/高(10000以上) 級"
puts "3. 選擇運算子  (1) ＋、－、×、÷ 自行決定"
puts "              (2) [＋、－]、[×、÷] 組別選定；運算子電腦隨機決定"
puts "              (3) [＋、－、×、÷] 運算子電腦隨機決定"
puts "4. 開始作答，打完提交考卷\n \n"
puts "		    請按Enter繼續..."
puts "============================================================"
nexts = gets.to_i

#1題數
y=1
while y==1
print "＊請輸入欲作答題數(輸入'0'電腦隨機5-10題,自選不得超過50題): "
count = gets.to_i
if count>0 && count<=50
y=y-1
elsif count==0
count=rand(5)+5
y=y-1
else 
puts "
不可以輸入非數字字元或超過50題喔,請在輸入一次"
end
end
puts "	=> 將要生成的題數是#{count}題\n \n"
#2初中高級
y=1
while y==1
print "(1)初級(數字0~99)\n(2)中級(數字100~9999)\n(3)高級(數字10000以上)\n"
print "＊請選擇難度(輸入1-3): "
level = gets.to_i
if level>0 && level<=3
y=y-1
end
end
if level ==1
ls = "初級"
elsif level ==2
ls = "中級"
elsif level ==3
ls = "高級"
end
puts "	=> 您選擇的是難度#{level}的級別\n \n"

#3運算子
y=1
while y==1
print "(1) ＋、－、×、÷ 自行決定\n(2) [＋、－]、[×、÷] 組別選定；運算子電腦隨機決定\n(3) [＋、－、×、÷] 電腦隨機\n"
print "＊請選擇題目使用的運算子(輸入1-3): "
operaters = gets.to_i
if operaters>0 && operaters<=3
y=y-1
end
end
puts "	=> 您選擇的是#{operaters}的運算子\n \n"

if operaters==1
print "請輸入1-5	(1)＋ (2)－ (3)× (4)沒有餘數的÷ (5)有餘數的÷ :"
op = gets.to_i		#a自行決定哪個運算子
elsif operaters==2
print "請輸入1-2	(1)[＋、－]加或減 (2)[×、÷]乘或除 :"
b = gets.to_i	#b自行決定哪個運算子組
if b==1	
op =rand(2)+1		#op:1+ 2- 3* 4/ 5/%
elsif b==2
op =rand(3)+3
end
elsif operaters==3
op =rand(5)+1
end

#選擇是否要進位/借位
if op!=4 && op!=5
print "\n \n請選擇1-2 (1)要進位/借位 (2)不要進位/借位 :"
dd = gets.to_i
else
dd=1
end



#生成題目
i=0
ques=Array.new
ans=Array.new
remains=Array.new
youa=Array.new
your=Array.new
opp=Array.new
while i<count
if operaters==1

elsif operaters==2

    
    if b==1	
    op =rand(2)+1		#op:1+ 2- 3* 4/ 5/%
    elsif b==2
    op =rand(3)+3
    end
elsif operaters==3
op =rand(5)+1
end
opp << op
#決定數字
if level==1&&dd==1    #兩位數要進位
    if op==1
        var=degit(1,1)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    elsif op==2
        var=degit(1,2)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    elsif op==3
        var=degit(1,3)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    else op==4||op==5
        var=degit(1,4)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    end

elsif level==1&&dd==2
    if op==1
        var=degit2(1,1)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    elsif op==2
        var=degit2(1,2)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    elsif op==3
        var=degit2(1,3)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    else op==4||op==5
        var=degit2(1,4)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    end

        
elsif level==2&&dd==1
    if op==1
        var=degit(2,1)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    elsif op==2
        var=degit(2,2)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    elsif op==3
        var=degit(2,3)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    else op==4||op==5
        var=degit(2,4)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    end
    
elsif level==2&&dd==2
    if op==1
        var=degit2(2,1)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    elsif op==2
        var=degit2(2,2)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    elsif op==3
        var=degit2(2,3)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    else op==4||op==5
        var=degit2(2,4)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    end

elsif level==3&&dd==1
    if op==1
        var=degit(3,1)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    elsif op==2
        var=degit(3,2)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    elsif op==3
        var=degit(3,3)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    else op==4||op==5
        var=degit(3,4)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    end
    
else level==3&&dd==2
    if op==1
        var=degit2(3,1)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    elsif op==2
        var=degit2(3,2)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    elsif op==3
        var=degit2(3,3)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    else op==4||op==5
        var=degit2(3,4)        #degit(level,op) op1+ op2- op3& op4/
        num1=var[0]
        num2=var[1]
    end

end
if num2>num1
k=num2
num2=num1
num1=k

end
if op==4 ||op==5 
    if level==2
    num2=rand(99)+2
    elsif level==3
    num2=rand(999)+2
    end
end	
if op==1
qustion = "#{num1} + #{num2} = ?".ljust(25," ")
ans << num1 + num2
elsif op==2
qustion = "#{num1} - #{num2} = ?".ljust(25," ")
ans << num1 - num2
elsif op==3
qustion = "#{num1} × #{num2} = ?".ljust(25," ")
ans << num1 * num2
elsif op==4
g=1
    while(g==1)
        if (num1%num2==0)
        g=0
        else
            if (level==2 ||level==1)
            num2=rand(99)+2
            elsif level==3
            num2=rand(999)+2
            
            end
        end
    end	
qustion = "#{num1} ÷ #{num2} = ?".ljust(25," ")
ans << num1 / num2
elsif op==5
qustion = "#{num1} ÷ #{num2} = ?  餘數 = ?".ljust(25," ")
ans << num1 / num2
remains << num1 % num2
end
ques << qustion
i=i+1
end



print "\n完成題目設定 請按任意鍵繼續..."

$stdin.gets
system('clear')		#clear screen

puts "======================================================================="
puts "#{ls} #{count}題\n \n"
i=0
while i<count
puts "#{i+1}. #{ques[i]}"
i=i+1 
end
puts "======================================================================="
puts "作答區 請依序作答：\n \n"
i=0
while i<count
print "#{i+1}. #{ques[i]} 你的答案: "
ya=gets.to_i
    if opp[i]==5
        print "餘數： "
        yr=gets.to_i
        your << yr
    end
youa << ya
i=i+1 
end
$stdin.gets
system('clear')		#clear screen

i=0
y=0
ca=0
str=Array.new
while i<count
    if opp[i]==5
    print "#{i+1}. #{ques[i]} 你的答案：#{youa[i]} 餘：#{remains[y]}".ljust(50," ")
    str << "#{i+1}. #{ques[i]} : 你的答案：#{youa[i]} 餘：#{remains[y]}".ljust(50," ")
    else
    print "#{i+1}. #{ques[i]} 你的答案：#{youa[i]}".ljust(50," ")
    str <<"#{i+1}. #{ques[i]} : 你的答案：#{youa[i]}".ljust(50," ")
    end
    if opp[i]==5
        if youa[i]==ans[i] && your[y]==remains[y]
             puts "➜ 恭喜你答對囉！"
        str << "➜ 恭喜你答對囉！"
            ca=ca+1
            y=y+1
        else
            puts "➜ 答錯囉⋯再接再厲！ 正確答案：#{ans[i]} 餘：#{remains[y]}"
            str << "➜ 答錯囉⋯再接再厲！ 正確答案：#{ans[i]} 餘：#{remains[y]}"
            y=y+1
        end
    else
         if youa[i]==ans[i]
            puts "➜ 恭喜你答對囉！"
            str << "➜ 恭喜你答對囉！"
            ca=ca+1
             else
            puts "➜ 答錯囉⋯再接再厲！ 正確答案：#{ans[i]}"
            str << "➜ 答錯囉⋯再接再厲！ 正確答案：#{ans[i]}"
         end
    end
i=i+1
end
puts "\n答對：#{ca} 總題數：#{count}"
po=(ca*100/count)
puts "答對率：#{po}%\n \n"
if po==100
    puts "太厲害了！命中率百分之百耶！"
    elsif (po>=80&&po<100)
    puts "還不錯耶⋯差一點點就全對了！再接再厲！"
    elsif (po<80&&po>=60)
    puts "還有練習的空間哦！"
    elsif po<60
    puts "可惜還不到及格分數⋯努力變得更強吧～再接再厲！"
end
puts "\n請按任意鍵完成交卷... \n \n"

$stdin.gets
system('clear')
i=0

str1=""
if(File.exist?('math.txt')==false)
File.open('math.txt', 'w') {|file| file.truncate(0) } #首次使用先創txt
end
str1= File.read('math.txt')		#先讀原本的存到str1，再清空，再存這次的題目，再將str1存進（使新的在上面）
File.open('math.txt', 'w') {|file| file.truncate(0) }
File.open("./math.txt",'a+')do |f|
f.puts""
t=Time.now
f.puts "#{t}"
f.puts""
    while i<str.length
        if i%2==1
        f.puts"#{str[i]}"
        f.puts""
        else
        f.write("#{str[i]}")
        end
        i=i+1 
    end
f.puts "答對：#{ca} 總題數：#{count}"
f.puts "答對率：#{po}% \n \n"
if po==100
    f.puts "太厲害了！命中率百分之百耶！"
    elsif (po>=80&&po<100)
    f.puts "還不錯耶⋯差一點點就全對了！再接再厲！"
    elsif (po<80&&po>=60)
    f.puts "還有練習的空間哦！"
    elsif po<60
    f.puts "可惜還不到及格分數⋯努力變得更強吧～再接再厲！"
end
f.puts " \n \n======================================================================="
f.write("#{str1}")
end

print"是否還要繼續？請選擇1-2 (1)是 (2)否 :"
if gets.to_i==2
ss=false
end
end