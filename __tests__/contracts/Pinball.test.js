require("dotenv/config");

describe("Pinball", function() {
  it("Should play Pinball.", async function() {
    const ballTotalSize = 512;

    const Pinball = await ethers.getContractFactory("Pinball");
    const pinball = await Pinball.deploy();
    await pinball.deployed();

    const commandsOffsetUpper = '00';
    const commandsOffsetLower = '08';
    const commandsLengthUpper = '00';
    const commandsLengthLower = '64';

    const commandsOffset = parseInt(`${commandsOffsetUpper}${commandsOffsetLower}`, 16);
    const commandsLength = parseInt(`${commandsLengthUpper}${commandsLengthLower}`, 16);

    // const maxNumberOfCommands = Math.floor((ballTotalSize - commandsOffset) / 5);

    if (commandsOffset + (commandsLength * 5) >= ballTotalSize) {
      throw new Error('Invalid commands!');
    }
    const moves = `0x${
      [...Array(ballTotalSize)]
          .map(() => '00')
          .map((_, i) => {
            if (i === 0) {
              return 'P'.charCodeAt(0).toString(16);
            } else if (i === 1) {
              return 'C'.charCodeAt(0).toString(16);
            } else if (i === 2) {
              return 'T'.charCodeAt(0).toString(16);
            } else if (i === 3) {
              return 'F'.charCodeAt(0).toString(16);
            } else if (i === 4) {
              return commandsOffsetUpper;
            } else if (i === 5) {
              return commandsOffsetLower;
            } else if (i === 6) {
              return commandsLengthUpper;
            } else if (i === 7) {
              return commandsLengthLower;
            } else if (i === 8) {
              // First move: Pull!
              return '01';
            } else if (i === 9) {
              // First move: Data offset upper.
              return '00';
            } else if (i === 10) {
              // First move: Data offset lower.
              return '00';
            } else if (i === 11) {
              // First move: Data length upper.
              return '00';
            } else if (i === 12) {
              // First move: Data length lower.
              return '00';
            } else if (i === 13) {
              // Second move flip right!
              return '04';
            } else if (i === 14) {
              return '00';
            } else if (i === 15) {
              return '00';
            } else if (i === 18) {
              // Third move: flip left!
              return '04';
            } else if (i === 23) {
              return '04';
            } else if (i === 28) {
              return '04';
            } else if (i === 33) {
              return '04';
            } else if (i === 38) {
              return '04';
            } else if (i === 43) {
              return '04';
            } else if (i === 48) {
              return '04';
            } else if (i === 53) {
              return '04';
            } else if (i > 53) {
              const m = i % 10;
              if (m === 3 || m === 8) {
                return '04';
              }
            }
            // Anything.
            return '00';
          })
          .join('')}`;

    const ball = ethers.utils.arrayify(moves);

    const initialCommitment = ethers.utils.keccak256(ball);
    const {blockNumber} = await pinball.insertCoins(initialCommitment);

    // Wait a little before playing.
    for (let i = 0; i < 4; i += 1) {
      await ethers.provider.send('evm_mine');
    }
    await pinball.play(ball, blockNumber);
  });
});
    