object Solution {
    def climbingLeaderboard(scores: Array[Int], alice: Array[Int]): Array[Int] = {
        val rank: Array[Int] = toRank(scores)
        val result = alice.map(binaryInsert(scores, _, rank))
        println(result)
        result
    }

    def toRank(scores: Array[Int]): Array[Int] = {
        var accum: Int = 1
        var actualMax = scores(0)
        scores.map(score => {
            if (score != actualMax) {
                actualMax = score
                accum += 1
            }
            accum
        })
    }

    def binaryInsert(scores: Array[Int], aliceScore: Int, rank: Array[Int]): Int = {
        binarySearch(scores, aliceScore, 0, scores.size, rank: Array[Int])
    }

    def binarySearch(scores: Array[Int], aliceScore: Int, left: Int, right: Int, rank: Array[Int]): Int = {
        val pos = (left - right)/2
        if(scores(pos) < aliceScore || left > right) rank(pos)
        else binarySearch(scores, aliceScore, left, pos, rank)
    }
}