import * as fs from "fs"
import { BigNumber } from "@ethersproject/bignumber"
import { ethers } from "hardhat";
import { parse } from "csv-parse"

export type Push = {
    num: number; 
    cost: BigNumber;
    pot: BigNumber;
    cumPot: BigNumber;
    take: BigNumber;
    cumTake: BigNumber;
    cut: BigNumber;
    bal: BigNumber;
}
const pushHeaders = ['num', 'cost', 'pot', 'cumPot', 'take', 'cumTake', 'cut', 'bal']

export type GameParams = {
    startingPrice: BigNumber; 
    timerDuration: number; 
    percentRateIncrease: number;
    percentToBoulder: number; 
    percentToPushers: number;
    percentToReserve: number;
    lastPush: number;
    boulderAtLastPush: BigNumber;
}
const gameHeaders = ['initial', 'boulderRate', 'potRate', 'cutRate', 'takeRate', 'lastPush', 'lastCost', 'data']

export var DefaultGameParams: GameParams = {
    startingPrice: ethers.utils.parseEther("0.005"),
    timerDuration: (24 * 3600),     // 24 hours 
    percentRateIncrease: 100,       // 1% increase per push
    percentToBoulder: 3000,         // 30% of each push goes to pot
    percentToPushers: 6000,         // 69% of each push goes to pushers
    percentToReserve: 100,          // 1% goes to the house
    lastPush: 0,                    // initialize as 0 address
    boulderAtLastPush: BigNumber.from(0)
  }
export async function getGameParams(caseNum: number) : Promise<GameParams> {
    let filepath = `test/case/case${caseNum.toString()}.csv`
    return new Promise(function(resolve,reject){
        let params: GameParams
        fs.createReadStream(filepath)
        .pipe(parse({
            delimiter: ",",
            fromLine: 2,
            toLine: 2,
            columns: gameHeaders})
        .on('data', function (row) {
            params = row
        }))
        .on('end', function () {
            resolve(params)
        })
    })
}

export class caseHelper {
    filepath: string
    caseNum: number 
    headerOffset:number = 2 // there are 2 lines of game params before push data 
    
    constructor(caseNum: number) {
        this.filepath = `test/case/case${caseNum.toString()}.csv`
        this.caseNum = caseNum
    }

    async getGameParams() : Promise<GameParams> {
        let f = this.filepath
        return new Promise(function(resolve,reject){
            let params: GameParams
            fs.createReadStream(f)
            .pipe(parse({
                delimiter: ",",
                fromLine: 2,
                toLine: 2,
                columns: gameHeaders})
            .on('data', function (row) {
                params = row
            }))
            .on('end', function () {
                resolve(params)
            })
        })
    }

    async getSinglePushParams(pushNum: number) : Promise<Push> {
        let f = this.filepath
        let lineNumber = pushNum + this.headerOffset
        return new Promise(function(resolve,reject){
            let params: Push
            fs.createReadStream(f)
            .pipe(parse({
                delimiter: ",",
                fromLine: lineNumber,
                toLine: lineNumber,
                columns: pushHeaders})
            .on('data', function (row) {
                params = row
            }))
            .on('end', function () {
                resolve(params)
            })
        })
    }
}
