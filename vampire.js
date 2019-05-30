class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    if (!this.creator) {
      return 0;
    }
    return this.creator.numberOfVampiresFromOriginal + 1;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return  this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  getAncestors() {
    if (!this.creator) {
      return [this];
    }
    return [this, ...this.creator.getAncestors()];
  }

  closestCommonAncestor(vampire) {
    const l1 = this.getAncestors();
    const l2 = vampire.getAncestors();

    const getNames = lin => lin.map(v => v.name);

    for (let name of getNames(l1)) {
      const closest = getNames(l2).indexOf(name);
      if (closest !== -1) {
        return l2[closest];
      }
    }
    throw 'no common root';
  }
}

module.exports = Vampire;

