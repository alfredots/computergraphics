/**
 * Nome: Alfredo Tito Silva
 */
/**
 * Escreva um algoritmo que calcule o produto vetorial entre dois vetores.
 */

function produtoVetorial(ax, ay, bx, by){

    var i = ax*by
    var j = ay*bx

    return i+j
}

/**
 * Escreva uma algoritmo que dados dois segmentos ab e cd do plano,
 * determinar se eles se interceptam.
 */

function verificaIntercepta(a,b,c,d){

    var v1 = produtoVetorial(a,b,a,c)
    var v2 = produtoVetorial(a,b,a,d)

    var v3 = produtoVetorial(c,d,c,a)
    var v4 = produtoVetorial(c,d,c,b)

    var exp1 = v1*v2 < 0;
    var exp2 = v3*v4 < 0;

    return exp1 && exp2;
}

/**
 * Escreva um algoritmo que utiliza coordenadas baricêntricas para
 * determinar se um dado ponto p pertence ao interior de um dado triângulo.
 */

function coordBaricentricas(p, p1, p2, p3){

    dem = [
        [p1.x, p2.x, p3.x],
        [p1.y, p2.y, p3.y],
        [1, 1, 1]
    ] 

    //Spp2p3
    mat1 = [
        [p.x, p2.x, p3.x],
        [p.y, p2.y. p3.y],
        [1,1,1]
    ]

    //Sp1pp3
    mat2 = [
        [p1.x, p.x, p3.x],
        [p1.y, p.y, p3.y],
        [1, 1, 1]
    ]

    //Sp1p2p
    mat3 = [
        [p1.x, p2.x, p.x],
        [p1.y, p2.y, p.y],
        [1, 1, 1]
    ]

    coef1 = (det(mat1)/det(dem))

    coef2 = (det(mat2)/det(dem))

    coef3 = (det(mat3)/det(dem))

    if(coef1>0 && coef2>0 && coef3>0)
        return true
    else
        return false
}