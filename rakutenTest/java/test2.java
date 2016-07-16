import java.util.Scanner;
class test2 {
	public static void main(String[] args) {
    System.out.print("Please input a positive integer num to check if a perfect square or not: ");
		Scanner input = new Scanner(System.in);
		int s = input.nextInt();
		boolean isPass = false;
		int num = 0;
		while(true){
			if(num*num<s){
				num++;
			}else if(num*num==s){
				isPass = true;
				break;
			}else{
				break;
			}
			
		}
		System.out.println(isPass);
	}
}