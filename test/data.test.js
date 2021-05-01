import should from 'should';
import { getMapData, read } from '../src/data';

describe('getMapData', function () {
    it('should get robot and map', function () {
        var d = getMapData();
        d.robots.should.have.size(6)
        d.obstacles.should.have.size(6)
    });
});

describe('read robot data', function () {
    it('should read data from robot01.dat', function () {
        var d = read('robot01.dat')
        d.should.equal("2	2	4	15.000000	4.000000	-3.000000	4.000000	-3.000000	-4.000000	15.000000	-4.000000	4	7.000000	4.000000	11.000000	4.000000	11.000000	8.000000	7.000000	8.000000	64.000000	64.000000	90.000000	80.000000	80.000000	0.000000	2	12.000000	0.000000	-2.000000	0.000000	1	3	-5.000000	-5.000000	5.000000	-5.000000	0.000000	5.000000	20.000000	20.000000	90.000000	30.000000	100.000000	0.000000	2	0.000000	-4.000000	0.000000	4.000000	")
        // console.log(d);
    });
});
