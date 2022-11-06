function moveForward () {
    mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Run, 60)
}
function turnLeft () {
    mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_SpinLeft, 60)
}
function turnRight () {
    mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_SpinRight, 60)
}
function faceFollowingMode () {
    huskylens.request()
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        xCenter = huskylens.readeBox(1, Content1.xCenter)
        if (xCenter < 80) {
            turnLeft()
        }
        if (xCenter > 240) {
            turnRight()
        }
        if (xCenter >= 80 && xCenter <= 240) {
            moveForward()
        }
    } else {
        mbit_Robot.CarCtrl(mbit_Robot.CarState.Car_Stop)
    }
}
let xCenter = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    faceFollowingMode()
})
