public class Main {
    public static void main(String[] args) {
        int a,b;
        int resultInt;
        double resultDouble;
        double d,e;
        Calculadora calculadora = new Calculadora();
        a=4;
        b=5;
        d=25;
        e=3.5;
        resultInt = calculadora.soma(a,b);
        System.out.println(resultInt);
        resultDouble = calculadora.divisaoD(d , e);
        System.out.println(resultDouble);


    }
}
