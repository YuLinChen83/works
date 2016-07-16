import java.util.Scanner;

class test1 {
	public static void main(String[] args) {
		System.out.print("Please input a string to reversed: ");
		Scanner input = new Scanner(System.in);
		String s = input.nextLine();
		String newS = "";
		int leng = s.length();
		for (int i = leng - 1; i >= 0; i--) {
			newS += s.charAt(i);
		}
		System.out.println(newS);
	}
}