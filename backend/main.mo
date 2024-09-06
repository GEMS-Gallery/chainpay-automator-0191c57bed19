import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Float "mo:base/Float";
import Hash "mo:base/Hash";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
  // Types
  type WalletInfo = {
    id : Text;
    balance : Float;
    createdAt : Time.Time;
  };

  type Transaction = {
    id : Text;
    amount : Float;
    recipient : Text;
    timestamp : Time.Time;
  };

  // Stable variables
  stable var walletInfo : ?WalletInfo = null;
  stable var transactionHistory : [Transaction] = [];

  // Helper functions
  func generateId() : Text {
    let now = Time.now();
    let hash = Hash.hash(Int.abs(now));
    Nat.toText(Nat32.toNat(hash))
  };

  // API methods
  public func createWallet() : async Result.Result<WalletInfo, Text> {
    switch (walletInfo) {
      case (?_) {
        #err("Wallet already exists")
      };
      case (null) {
        let newWallet : WalletInfo = {
          id = generateId();
          balance = 0.0;
          createdAt = Time.now();
        };
        walletInfo := ?newWallet;
        #ok(newWallet)
      };
    }
  };

  public query func getWalletInfo() : async Result.Result<WalletInfo, Text> {
    switch (walletInfo) {
      case (?info) { #ok(info) };
      case (null) { #err("Wallet not found") };
    }
  };

  public func fundWallet(amount : Float) : async Result.Result<Float, Text> {
    switch (walletInfo) {
      case (?info) {
        let newBalance = info.balance + amount;
        walletInfo := ?{ info with balance = newBalance };
        #ok(newBalance)
      };
      case (null) { #err("Wallet not found") };
    }
  };

  public func sendMassPayout(addresses : [Text], amount : Float) : async Result.Result<[Transaction], Text> {
    switch (walletInfo) {
      case (?info) {
        let totalAmount = Float.mul(Float.fromInt(addresses.size()), amount);
        if (info.balance < totalAmount) {
          return #err("Insufficient balance");
        };

        var newTransactions : [Transaction] = [];
        for (recipient in addresses.vals()) {
          let transaction : Transaction = {
            id = generateId();
            amount = amount;
            recipient = recipient;
            timestamp = Time.now();
          };
          newTransactions := Array.append(newTransactions, [transaction]);
        };

        let newBalance = info.balance - totalAmount;
        walletInfo := ?{ info with balance = newBalance };
        transactionHistory := Array.append(transactionHistory, newTransactions);

        #ok(newTransactions)
      };
      case (null) { #err("Wallet not found") };
    }
  };

  public query func getTransactionHistory() : async [Transaction] {
    transactionHistory
  };
}
