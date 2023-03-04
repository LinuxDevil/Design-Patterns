// Visitor Design Pattern
// ----------------------

// The Visitor pattern is a behavioral design pattern that
// lets you separate algorithms from the objects on which
// they operate. The Visitor pattern is useful when you have
// a complex object structure that contains many classes of
// objects with different interfaces. You want to be able to
// define new operations without changing the classes of the
// objects on which they operate.

// The Visitor pattern lets you move the operational logic
// out of the objects themselves and into separate classes
// called visitors. The original object that had the logic
// is now called the acceptor. The acceptor accepts a visitor
// object and calls a visitor method that corresponds to the
// operation you want to perform. The visitor object then
// performs the operation on the acceptor object.

// Problem:
// Consider a music library application that allows users to browse
// and play different types of audio files, such as mp3, wav,
// and flac files. Each audio file type requires a different audio player
// to play the file. To implement this functionality, we can use the Visitor 
// pattern.

// The AudioFile protocol would be the Element, and the different audio
// file types would be the ConcreteElements. The AudioPlayer protocol
// would be the Visitor, and the different audio player
// (e.g. MP3Player, WAVPlayer, FLACPlayer) would be the ConcreteVisitors.

// Define the AudioFile protocol
protocol AudioFile {
    var fileName: String { get }
    var fileSize: Int { get }
    func accept(_ audioPlayer: AudioPlayer)
}

// Implement the MP3 concrete element
class MP3: AudioFile {
    var fileName: String
    var fileSize: Int
    
    init(fileName: String, fileSize: Int) {
        self.fileName = fileName
        self.fileSize = fileSize
    }
    
    func accept(_ audioPlayer: AudioPlayer) {
        audioPlayer.play(self)
    }
}

// Implement the WAV concrete element
class WAV: AudioFile {
    var fileName: String
    var fileSize: Int
    
    init(fileName: String, fileSize: Int) {
        self.fileName = fileName
        self.fileSize = fileSize
    }
    
    func accept(_ audioPlayer: AudioPlayer) {
        audioPlayer.play(self)
    }
}

// Implement the FLAC concrete element
class FLAC: AudioFile {
    var fileName: String
    var fileSize: Int
    
    init(fileName: String, fileSize: Int) {
        self.fileName = fileName
        self.fileSize = fileSize
    }
    
    func accept(_ audioPlayer: AudioPlayer) {
        audioPlayer.play(self)
    }
}

// Define the AudioPlayer protocol
protocol AudioPlayer {
    func play(_ file: AudioFile)
}

// Implement the MP3Player concrete visitor
class MP3Player: AudioPlayer {
    func play(_ file: AudioFile) {
        guard let mp3 = file as? MP3 else {
            fatalError("Cannot play non-MP3 file as MP3")
        }
        print("Playing MP3 file: \(mp3.fileName)")
    }
}

// Implement the WAVPlayer concrete visitor
class WAVPlayer: AudioPlayer {
    func play(_ file: AudioFile) {
        guard let wav = file as? WAV else {
            fatalError("Cannot play non-WAV file as WAV")
        }
        print("Playing WAV file: \(wav.fileName)")
    }
}

// Implement the FLACPlayer concrete visitor
class FLACPlayer: AudioPlayer {
    func play(_ file: AudioFile) {
        guard let flac = file as? FLAC else {
            fatalError("Cannot play non-FLAC file as FLAC")
        }
        print("Playing FLAC file: \(flac.fileName)")
    }
}

// Usage
let mp3File: AudioFile = MP3(fileName: "song.mp3", fileSize: 5000)
let wavFile: AudioFile = WAV(fileName: "song.wav", fileSize: 10000)
let flacFile: AudioFile = FLAC(fileName: "song.flac", fileSize: 15000)

let mp3Player: AudioPlayer = MP3Player()
let wavPlayer: AudioPlayer = WAVPlayer()
let flacPlayer: AudioPlayer = FLACPlayer()

mp3File.accept(mp3Player)  
wavFile.accept(wavPlayer) 
flacFile.accept(flacPlayer)

